<script>
  import HalfMdHalfImageCell from "../../components/HalfMdHalfImageCell.svelte";
  import MdCell from "../../components/MDCell.svelte";
  import Section from "../../components/Section.svelte";
  import CodeCell from "../../components/CodeCell.svelte";

  import diff from "../../imgs/diff.png";
  import Teaser from "../../components/Teaser.svelte";
</script>

<Section
  title="### LLM Generation Data Science"
  subtitle="*August 2024*"
  hideToStart={true}
>
  <div slot="hiddenBlurb">
    <Teaser
      imgSrc={diff}
      imgAlt="A plot of regex vs. semantic vs. GPT vs. normal diff"
      text="A Cisco project where I do some data science to try and improve a
    LLM generation process"
    />
  </div>

  <HalfMdHalfImageCell
    md="I had the opportunity to work on an internal Cisco project exploring how well an LLM email generation process was doing. A system would generate emails which are then looked over by users, optionally changed, and then sent. As a metric of how well the process was doing, the stakeholders were currently calculating a diff between the sent and generated email. 

I was tasked with exploring this diff, and seeing how it could be improved."
    imageSrc={diff}
  />

  <MdCell
    md={`An important lesson I learned is that ‘data analysis’ is a surprisingly difficult thing to do. This motif appears later in my AI Math solving exploration as well. There are so many different ways of calculating metrics, and so many different metrics. 

Crucially, these metrics also depend on the audience and your intentions - the metrics you would show to an executive are completely different than those you might show to a technical stakeholder, and again different than those a customer might care about.

It's fascinating. You want to create some sort of visualization out of your data that your audience can easily read. This is something I find really interesting, especially when reading AI papers. 

To explore the diff, I created multiple Jupyter notebooks and spent a few weeks immersing myself in the data =>`}
  />

  <MdCell
    md={`1. I poured over hundreds of examples, explored different ways of both sorting & filtering, and visualizing the differences to get impactful metrics.`}
  />

  <Section title="Code:" inset={true} hideToStart={true}>
    <CodeCell
      code={`# Display a toggleable output
from IPython.display import display, HTML

def toggleable_output(text, identifier):
    html = f"""
    <button onclick="var x = document.getElementById('toggleText_{identifier}'); x.style.display = x.style.display === 'none' ? 'block' : 'none';">
        Toggle {identifier}
    </button>
    <div id="toggleText_{identifier}" style="display:none;">
        {text}
    </div>
    """

    display(HTML(html))`}
    />

    <CodeCell
      code={`# Create html object to show diff visually
def show_visual_diff_difflib(
    old_string: str, new_string: str, wrap_column=60
):
    diff_html = difflib.HtmlDiff(wrapcolumn=wrap_column).make_file(old_string.split(), new_string.split(),)

    # Remove legend & links
    diff_html = re.sub(r'<table class="diff" summary="Legends".*?</table>', "", diff_html, flags=re.DOTALL)
    diff_html = re.sub(r'</td>\s*<td>\s*<table border="" summary="Links".*?</table>\s*</td>\s*</tr>', "", diff_html, flags=re.DOTALL)

    return '<style>.diff_add, .diff_chg, .diff_sub {color: black;}</style>' + diff_html`}
    />

    <CodeCell
      code={`# Narrow down to useful data to check out. When checking how a process affected a diff I couldn't just plot everything. It becomes a mess, as shown by the plot above
improved_diffs = []
for row in items: # Items is a df of calculated diff scores and text
    new_diff = row["New_diff"]
    diff = row["Diff"]
    if new_diff - diff > .2: # I played around with this number. 0.2 usually was a good heuristic of narrowing down the data but not nitpicking
        improved_diffs.append(row)

print(f"rows with improvements > .2: {len(improved_diffs)}, out of {len(items)}")

# For item in improved_diffs
# Using the difflib html object + toggling to make the visualization process easier
original_diff_text = f"Original diff:\n{item['Diff']}\n" + show_visual_diff_difflib(item["Generated"], item["Sent"])
toggleable_output(original_diff_text, "original_diff")

new_diff_text = f" diff:\n{item['new_diff']}\n" + show_visual_diff_difflib(item["new_diff_generated"], item["new_diff_sent"])
toggleable_output(new_diff_text, "new_diff")`}
    />
  </Section>

  <MdCell
    md={`2. I tried multiple methods for cleaning the data before taking the diff, including using ChatGPT and semantic similarity matching, to get a score that reflected *more accurately* how good the generation was. `}
  />

  <Section title="Code:" inset={true} hideToStart={true}>
    <CodeCell
      code={`# Returns the original text split into main part and trailing addition
def check_if_trailing_addition(sent: str, generated: str):
    testing_diff = list(
        difflib.ndiff(
            generated.strip().splitlines(),
            sent.strip().splitlines(),
        )
    )
    last_section_length = 0

    # Find the last section of completely new lines
    for i, line in enumerate(reversed(testing_diff)):
        if line.startswith("+ "):
            last_section_length += 1
        elif line.startswith("? "):  # difflib metadata
            continue
        else:
            break

    if last_section_length > 0:
        # Split into main & trailing addition
        sent_lines = sent.strip().splitlines()
        main_part = "\n".join(sent_lines[:-last_section_length])
        trailing_addition = "\n".join(sent_lines[-last_section_length:])
        return trailing_addition, main_part

    return False, sent`}
    />

    <CodeCell
      code={`# Code to detect common signature chunks ----------
from sentence_transformers import SentenceTransformer, util

model = SentenceTransformer('all-MiniLM-L6-v2')
signature_embeddings = model.encode(known_signature_chunks, convert_to_tensor=True)

# Pre-vectorize searchable text, broken down by sentence level
def vectorize_text_by_sentences(text: str, model: SentenceTransformer):
    sentences = text.splitlines()
    sentence_embeddings = model.encode(sentences, convert_to_tensor=True)
    return sentences, sentence_embeddings

def remove_signature_chunks(trailing_addition: str, signature_embeddings, model: SentenceTransformer, threshold=0.6):
    lines, sentence_embeddings = vectorize_text_by_sentences(trailing_addition, model)

     # Sliding window - to match and remove signatures
    for start in range(len(lines)):
        for window_size in range(1, len(lines) - start + 1):
            # Extract the embeddings for the current window of sentences
            window_embeddings = sentence_embeddings[start:start + window_size]
            combined_window_embedding = window_embeddings.mean(dim=0, keepdim=True)

            # Calculate cosine similarity between the current window and known signature embeddings
            cosine_scores = util.cos_sim(combined_window_embedding, signature_embeddings)
            max_score = max(cosine_scores[0])

            if max_score > threshold:
                print(f"Match: {max_score:.4f}")
                # Remove all lines after the match
                remaining_text = "\n".join(lines[:start])
                return remaining_text
    # No match found
    return False`}
    />
  </Section>

  <MdCell
    md={`Reflection: 

1. I made some progress on improving the diff, and exploring alternative methods. I found that the diff library they were using was comparing sentences, so by changing this to match every single character the similarity score increased - which was, *technically*, the objective. 

2. I learned a lot - becoming more familiar with python, the pitfalls of data analysis - it's easy to get lost in the minutia.  

3. Something that interested me, but I was not able to explore, was using the diff scores to improve the generation process. We have the data for each diff - it would be interesting to try collating these and sorting them by similar corrections to produce recommendations or common problems. You could imagine this being done automatically and generating a list of top 'x' priorities to make the generation more accurate, along with the % improvement each would bring. 

  > Whenever I can, I like to automate. This drive and desire to explore new ideas is something that I look forward to bringing to a smaller company, with more cross-functional opportunities


The lead of the project remarked:
"Your curiosity, ability to learn new concepts, and come up with out-of-the-box ideas are impressive.”`}
  />
</Section>
