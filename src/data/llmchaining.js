export const llmChainingExploration = {
  id: "llm-chaining-exploration",
  title: "LLM Chaining Exploration",
  date: "October 2024",
  source: "local",
  summary: "An exploration of a research paper into agentic AI workflows. Chaining LLM calling and testing out different patterns",
  content: [
    {
      type: "md",
      content: `During some downtime at work, I explored a Cisco research project focused on agentic AI workflows to improve performance on math problem-solving benchmarks. 

I optimized the code base, explored asynchronous alternatives, and reduced costs while increasing speed. I  also explored alternative methods for connecting LLM calls and evaluated their effectiveness in problem-solving.

This experience sharpened my skills in prompt engineering, OpenAIs API structure, and agentic workflows (specifically debugging & dealing with overhead).

I wanted to explore chaining multiple calls to LLMs. I started with this [paper](https://arxiv.org/abs/2404.04735) as an existing benchmark. In the paper they essentially just chain a few LLM calls together and get some performance improvement on a benchmark of math problems. Their methodology essentially involves: 

1. Calling the LLM to examine the initial problem
2. Repetitively asking the LLM for \`conditions\` that could be helpful to solve it. 
3. Doing step 2 5 times to make a pool.
4. Asking the LLM to generate solution steps using the condition pool.

They also try and give the LLMs roles, with a judge, executor, and ideator, but I don't think this matters.

My goal with this project was just to learn, and mess around, using what they have as a baseline. Here is a rough timeline of what I attempted:

1. First, I cloned and looked at the existing code base
    1. I re-wrote a lot of their stuff to be modifiable, and added helper functions.
    2. I converted most of the GPT calls to async (I didn't finish this until later). For reference, the first time I ran it on one problem it took about 7 minutes (19 in-order requests). 
    3. I cleaned up prompts, and I switched the whole thing to a cheaper form of GPT so I could run multiple times. 
    4. I also moved away from using the code editor, and I switched to pure LLM calls instead of using the OpenAI assistants. 
        > I actually spent a while messing around with this. They were using OpenAI's Assistants. OpenAI charges per code session, but once you start a code session it lasts for an hour. So if I could re-use this code session it would be cheaper. This required me to use the same conversation, so I set up some helper code to manage clearing and re-populating the message history. I finally got it working, and it only saved me ~3% of the total cost : /
    4. I added logging so that I could start investigating what was going wrong.
    5. By switching to just calling chat complete instead of using assistants I was able to enable schema enforcement. This allowed me to get exact types from GPT responses. This was *way* nicer than using regex and hoping. Of course, in the background all OpenAI is doing is some form of regex/heuristics + some sort of self-correction - BUT they have much more error handling than me. Why do it myself?`,
    },
    {
      type: "code",
      contents: [
        {
          language: "python",
          content: `#utils/async_gpt.py

timeout_settings = httpx.Timeout(
    connect=5.0,  
    read=15.0,  
)

client = openai.AsyncOpenAI(api_key=OPENAI_KEY, timeout=timeout_settings)

@backoff.on_exception(
    backoff.expo, 
    APIConnectionError, 
    max_tries=5, 
    jitter=backoff.full_jitter, 
    on_backoff=backoff_hdlr,
    on_giveup=giveup_hdlr,
)
async def agenerate_from_gpt(messages: list[ChatCompletionMessage]):
    """
    Messages:
        ChatCompletionMessage ([{"role": "", "content": ""}, {"role": "", "content": ""}])
    """
    response = await client.chat.completions.create(
        model="gpt-4o",
        messages=messages,
    )
    return response.choices[0].message.content`,
        },
        {
          language: "python",
          content: `# utils/async_logger.py
    
# Use classMethod decorator - singleton to maintain consistent state. Flush data to avoid file handling
class AsyncLogger:
    """
    Instead of logging to files directly we save data until flush and then output it.
    Can have multiple data files concurrently. 
    """

    _log_directory = "./output/"
    _data: dict[str, str] = {}
    os.makedirs(_log_directory, exist_ok=True)

    @classmethod
    def add_message(self, path, *args):
        """Add message(s) to existing. Adds newline in between messages. Path can have multiple subdirs."""
        message = "\\n".join([str(a) for a in args])
        if path in self._data:
            self._data[path] += f">> \\n{message}"  # Add >> to make messages stand out
        else:
            self._data[path] = f">> {message}"
    
            classmethod
    async def flush_one(self, path):
      """**ASYNC** Output one message. Clear message"""
      if path in self._data:
          intermediate_dirs = os.path.dirname(path)
          if intermediate_dirs:
              os.makedirs(f"{self._log_directory}{intermediate_dirs}", exist_ok=True)

          messages = self._data[path]
          async with await anyio.open_file(
              f"{self._log_directory}{path}.md", "w"
          ) as f:
              await f.write(messages)

          del self._data[path]`,
        },
        {
          language: "python",
          content: `#utils/gpt_async_assistant.py

async def agenerate_from_code_assistant(persona, content, assistant, thread):
    """
    Clears all current thread but end, to preserve thread. Only used with coding_asssistant and coding_thread

    Returns:
        Response: a list of the responses, in format {"role":"", "content":""}
    """

    # Delete all messages but the dummy - the chronologically first one - this will retain code sessions
    thread_messages = await client.beta.threads.messages.list(thread.id)
    message_list = [message.model_dump() for message in thread_messages.data]
    for message in message_list[:-1]:
        id = message.get("id")
        await client.beta.threads.messages.delete(
            message_id=id,
            thread_id=thread.id,
        )

    # Add persona and prompt messages
    await client.beta.threads.messages.create(
        thread_id=thread.id,
        role="user",  # I want this to be system but it's only assistant or user. Could try putting it in assistant terms, e..g "I am a judge"..
        content=persona,
    )
    await client.beta.threads.messages.create(
        thread_id=thread.id,
        role="user",
        content=content,
    )

    # Start a new run - this is where we link the thread and the assistant
    run = await client.beta.threads.runs.create(
        thread_id=thread.id,
        assistant_id=assistant.id,
    )

    while run.status in ["queued", "in_progress"]:
        run = await client.beta.threads.runs.retrieve(
            thread_id=thread.id, run_id=run.id
        )

    if run.status == "completed":
        # Get all messages and turn into obj format
        thread_messages = await client.beta.threads.messages.list(
            thread_id=thread.id, order="asc"
        )
        messages = []
        for message in thread_messages.data:
            content = ""
            for content_item in message.content:
                if hasattr(content_item, "text"):
                    content += content_item.text.value
            messages.append({"role": message.role, "content": content})

    else:
        print(f"weird run status: {run.status}")
        messages = []

    # ignore first 3 since they are dummy, persona, and prompt
    return messages[3:]`,
        },
      ],
    },
    {
      type: "md",
      content: `*At this point it would have been a good idea to re-run benchmarks. I did not do this. This led to having a hard time measuring improvement, since my only comparison was their original code, which performs better since but uses expensive GPT and drew many more samples.* 

2. Then I started tweaking things.  
    1. I didn't like how they were doing the same thing over and over and averaging it. It's possible this is actually the [best way](https://redwoodresearch.substack.com/p/getting-50-sota-on-arc-agi-with-gpt) but I didn't find it particularly interesting. Instead I wanted to try doing more correction of wrong steps - finding errors and trying to fix them directly. 
        1. Multiple checks on conditions - check if we have generated enough, and then check that. 
        2. Re-assessmemnt of solution steps + regeneration`,
    },
    {
      type: "code",
      contents: [
        {
          language: "diff",
          content: `# chains/main4/main.py

async def main4(
    question, max_times_mining_new, coding_assistant, coding_thread, log_path
):

    AsyncLogger.add_message(log_path, "## Begin")
    CustomLogger.print(f"Starting {log_path}")

    conditions, objectives = await extract_from_original(question)
    c_str, o_str = conditions_objectives_to_string(conditions, objectives)
    AsyncLogger.add_message(
        log_path, "Extracted from problem, (conditions, objectives)", c_str, o_str
    )

+    # New condition mining loop has a max # of tries
+    for i in range(max_times_mining_new):
        unchecked_conditions = await new_conditions_from_existing(
            conditions, objectives
        )
        AsyncLogger.add_message(
            log_path,
            f"## Mined new conditions from existing ({i+1}/{max_times_mining_new}):"
            f"Unchecked Conditions ({i+1}/{max_times_mining_new})",
            list_to_numbered_string(unchecked_conditions),
        )

        verified_conditions = []
        # Check each new condition w/ the judge - check_statment
        for i, unchecked in enumerate(unchecked_conditions):
            AsyncLogger.add_message(log_path, f"Verifying condition #{i+1}")

+            # Verifies new condition. If it's wrong, tries to correct. Verifies that corrected condition. If wrong again, returns None
+            verified = await verify_new_condition(
                objectives,
                conditions,
                unchecked,
                coding_assistant,
                coding_thread,
            )
            if verified:
                verified_conditions.append(verified.new_condition)
                AsyncLogger.add_message(log_path, "Verified", verified.new_condition)
            else:
                AsyncLogger.add_message(
                    log_path,
                    "Invalid",
                )

+        # Add the new verified conditions to the exisiting conditions!
+        conditions += verified_conditions
+        AsyncLogger.add_message(
+            log_path, "All Conditions: ", list_to_numbered_string(conditions)
+        )
+
+        if_got_answer = await check_answer(conditions, objectives)
+        AsyncLogger.add_message(log_path, f"Do we have answer?: {if_got_answer}")
+
+        if if_got_answer:
+            break

    CustomLogger.print(f"finished mining conditions ({log_path})")

    # TODO: Not sure how to make this work yet.
    # We should have a list of conditions that are ready. Let's check and see if any contradict
    # This will return the conditions if they are good, and remove any that contradict
    # conditions = double_check_conditions(conditions)

    steps = await create_steps(conditions, objectives)

+    # Check if steps are accurate - 2 retries.
+    for _ in range(2):
+        accept_or_reject = await verify_steps(steps, objectives)
+        AsyncLogger.add_message(
+            log_path,
+            "### Step",
+            steps,
+        )
+        if accept_or_reject.acccept:
+            AsyncLogger.add_message(
+                log_path,
+                "Approved",
+            )
+            break
+        # Pass in the reason for failure
+        steps = await create_steps(
+            conditions,
+            objectives,
+            f"The last step generation process failed becase:\\n {accept_or_reject.reason}",
+        )

    AsyncLogger.add_message(
        log_path,
        "## Final",
        "Conditions:",
        list_to_numbered_string(conditions),
        "Objectives:",
        list_to_numbered_string(objectives),
        "Steps:",
        steps,
    )
    answer = await execute_steps(
        conditions, objectives, steps, coding_assistant, coding_thread
    )
    AsyncLogger.add_message(log_path, "Generated Answer: ", answer)

    # Flush out one message
    await AsyncLogger.flush_one(log_path)

    CustomLogger.print(
        f"Finished {log_path} in ({CustomLogger.elapsed_time()}): the final answer is {answer}"
    )
    return answer`,
        },
      ],
    },
    {
      type: "md",
      content: `3. I noticed that the conditions as they were were not really conditions. They were basically just tyring to solve the problem. Half the time they would be steps to solve the problem. So basically just *drawing more samples* again. To do something different I wanted to do something more in order. When solving a math problem, I'd be doing different steps each time. I completely switched up the idea =>
    1. Ask the LLM to generate a step by step solution to the problem in one pass.
    2. Go through step by step
    3. Verify that the step is correct. If not, regenerate it and the following steps.
    4. Once we reach the end, try having the LLM follow those steps.

*This is the graphic shown :)*

I experimented with generating a set amount of steps and having the LLM 'decide'`,
    },
    {
      type: "code",
      contents: [
        {
          language: "python",
          content: `async def step_by_step_loop(question: str, log_path:str):
    AsyncLogger.add_message(log_path, f"Starting run {log_path}",)
    # Max steps is used to try and keep gpt from generating a million steps or 1 step each time.
    MAX_STEPS = 5
    verified_steps = []
    unverified_steps = await create_steps(question, [], MAX_STEPS)

    while len(unverified_steps) > 0 and len(verified_steps) < MAX_STEPS:
        current_step = unverified_steps.pop(0)
        AsyncLogger.add_message(log_path, f"Verify the current step: \\n{current_step}")
        verify = await verify_step(question, verified_steps, current_step)

        if not verify.correct:
            AsyncLogger.add_message(log_path, f"Fix the current step for reasoning: {verify.reasoning}")
            fixed_step = await fix_step(question, verified_steps, current_step, verify.reasoning)
            AsyncLogger.add_message(log_path, f"#Fixed step: {fixed_step}")

            # After fixing a step we need to verify it since it often gets off the rails. 
            # If it's correct we can add it. Else we throw the current step out and regenerate
            verify_fixed = await verify_step(question, verified_steps, fixed_step)
            AsyncLogger.add_message(log_path, f"Fixed step was verified as: {verify_fixed.correct}")
    
            if verify_fixed.correct:
                verified_steps.append(fixed_step)
                if len(verified_steps) == MAX_STEPS: # If we have reached the end, break here. #TODO: would be nice to avoid checking len(verified_steps) in two places..
                    break
            
            unverified_steps = await create_steps(question, verified_steps, MAX_STEPS - len(verified_steps))
            AsyncLogger.add_message(log_path, f"Regenerated steps: \\n{unverified_steps}")

        else:
            AsyncLogger.add_message(log_path, "Step was correct. Add to verified")
            verified_steps.append(current_step)


    AsyncLogger.add_message(log_path, "We have our verified steps:==========\\n")

    steps_str = "\\n".join([f"Step {i+1}:\\n{step}" for i, step in enumerate(verified_steps)])
    AsyncLogger.add_message(log_path, steps_str)

    final_answer = await get_answer_from_steps(verified_steps)
    AsyncLogger.add_message(log_path, f"And our Final Answer\\n{final_answer}")

    await AsyncLogger.flush_one(log_path)
    return final_answer`,
        },
        {
          language: "python",
          content: `async def step_by_step_loop_2(question: str, log_path:str):
    AsyncLogger.add_message(log_path, f"Starting run {log_path}",)
    # More of a suggestion.. used as a starting point. The regeneration will always generate at least 1 step
    MIN_STEPS = 5

    unverified_steps = []
    verified_steps = []
    while True:
        # Generate if unverified_steps empty.
        if not unverified_steps:
            desired_steps = max(1, MIN_STEPS - len(verified_steps))
            unverified_steps = await create_steps_2(question, verified_steps, desired_steps)
            AsyncLogger.add_message(log_path, f"Generated steps: \\n{unverified_steps}")

        # Verify the current step
        current_step = unverified_steps.pop(0)
        verify = await verify_step(question, verified_steps, current_step)
        AsyncLogger.add_message(log_path, f"Verifying current step: \\n{current_step}")
        
        # If correct, add to verified_steps
        if verify.correct:
            AsyncLogger.add_message(log_path, "Step was correct. Add to verified")
            verified_steps.append(current_step)
        else:
            # Since the step was incorrect, throw away the rest of the unverified steps (triggers regeneration next time)
            unverified_steps = []

            # Try fixing step -> overwrite current_step
            current_step = await fix_step(question, verified_steps, current_step, verify.reasoning)
            AsyncLogger.add_message(log_path, f"Fix the current step for reasoning: {verify.reasoning}")
            AsyncLogger.add_message(log_path, f"Fixed step: {current_step}")
            
            # Verify fixed step
            verify_fixed = await verify_step(question, verified_steps, current_step)
            AsyncLogger.add_message(log_path, f"Fixed step was verified as: {verify_fixed.correct}")
            
            # Add if correct
            if verify_fixed.correct:
                verified_steps.append(current_step)
            else:
                # If the fixed_step is incorrect, skip checking for the answer
                continue
            
        # We want to at least generate 5 steps.. to avoid premature stopping
        if len(verified_steps) >= MIN_STEPS:
            # Check if all the steps give the answer
            if await do_we_have_answer2(question, verified_steps):
                AsyncLogger.add_message(log_path, f"We have answer triggered")
                break`,
        },
      ],
    },
    {
      type: "md",
      content: `This was working okay. The problem is things start getting real complex. For that second step by step function
I had to write a ton of code just to revise a few things. It's not difficult, but it's a lot of context to hold in your head.
It's difficult to write re-usable functions when everything about them is changing (order, prompts, etc.)

I also got lost in terms of metrics. 
There were really two things that I had to manage - the overhead and building out helpers (logging, reusable functions) - and trying out different patterns of calling/prompts. It caused a fair amount of friction doing both. I see the value in tools like langchain - at least for when you're prototyping.

> If I was approaching this project now I would start by defining success metrics. Exploration is fun, but its hard to make progress when you don't know where you're going. I would also start with jupyter notebooks way sooner. They're so useful

More detailed reflections: 

1. This endeavor was not entirely fruitful. One big challenge is benchmarking. Every call to GPT has some element of randomness in its return. When adding multiple together, it gets very complex very quickly. Even one call can be hard since there's no function or obvious way to calculate randomness (that I know of). It's also kind of a nebulous problem.

2. Another is how AI models are easily influenced. I imagine this is due to training that makes them agreeable to users, but when given a false idea (let's say call #1 returned an incorrect assumption), it seems that call #2 often will not question that idea. 

Taking this idea a bit further, each call seems to perform worse and worse. I'm not sure why this is, though it would be interesting to read more about it. It seems impossible to do error correcting *completely* with LLM's right now. 

In the end I did not achieve much noteworthy. But I understand a few things better now:
1. python codebases
2. python asynchronous libraries - I used anyio w/ the default configuration of asyncio backend. I like anyio.
3. The complexities that arise in multi-LLM interactions
4. The overhead that comes with trying to improve chained LLM performance - there are so many variables to adjust - models, prompts, chaining order, and much more. And it's not a consistent result.

I also had some more abstract rambling:

I thought a lot about how we think, and about hiearchial forms of thought. For instance, starting at small provable concepts, using those to create higher level concepts, and so on. This is (very simplified) how we do things as humans. If I look at a complex belief I have, it's predicated on lower and lower level ideas that have been lodged in my brain. It can be hard to change someones mind because even when a low level fact is changed, humans don't always update the higher order concepts that rest on it, or even think about that process. 

This leads me to something that I've been thinking about for a while, a way of creating a living essay. It would be cool to write a persuasive essay in a way that drew directly from the facts in it, so that when things were changed, everything downstream changed too. 

Of course, a lot of ideas are nebulous, but if you could lay out some amount of priors and assign some weight to each that showed how much it affected a higher level concept, then a reader could actually interact with your argument and see it change.`,
    },
  ],
};