<script>
  export let showForm = false; // Parent controls this

  let name = "";
  let info = "";
  let company = "";
  let position = "";
  let fit = "";
  let status = "";

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new URLSearchParams();
    formData.append("entry.1070389681", name);
    formData.append("entry.927940325", info);
    formData.append("entry.1627112616", company);
    formData.append("entry.44072114", position);
    formData.append("entry.1108380112", fit); // Changed from 'passion' to 'fit'

    try {
      await fetch(
        "https://docs.google.com/forms/d/e/1FAIpQLSfSHCucAjSY6i48gRL5rrlQmj3tr7jdcV0zJ4R_Ui0Owtl3kg/formResponse",
        {
          method: "POST",
          body: formData,
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          mode: "no-cors",
        }
      );

      status = "Form submitted successfully!";
      name = info = company = position = fit = ""; // Clear form fields
      showForm = false; // Hide form after submission
    } catch (error) {
      status = "Failed to submit the form.";
      console.error("Error:", error);
    }
  };
</script>

<div class="form-container" class:hidden={!showForm}>
  <form on:submit={handleSubmit}>
    <label>Name:</label>
    <input type="text" bind:value={name} required />

    <label>Info:</label>
    <input type="text" bind:value={info} required />

    <label>Company:</label>
    <input type="text" bind:value={company} required />

    <label>Position:</label>
    <input type="text" bind:value={position} required />

    <label>Why would I be a good fit?</label>
    <textarea bind:value={fit} required></textarea>

    <button type="submit">Submit</button>
  </form>

  {#if status}
    <p>{status}</p>
  {/if}
</div>

<style>
  .form-container {
    max-width: 400px;
    margin-right: 40px;
    margin-left: 40px;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }

  label {
    font-weight: bold;
    margin-top: 10px;
    display: block;
  }

  input,
  textarea {
    width: 100%;
    padding: 10px;
    margin-top: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 14px;
  }

  button {
    background: #007bff;
    color: white;
    border: none;
    padding: 10px 15px;
    margin-top: 15px;
    cursor: pointer;
    border-radius: 5px;
    width: 100%;
  }

  button:hover {
    background: #0056b3;
  }
</style>
