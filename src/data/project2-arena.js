export const arenaAiSafety = {
  id: "arena-ai-safety",
  title: "ARENA AI safety",
  date: "Mar 2025",
  summary:
    "To familiarize myself with AI safety & ML fundamentals, I self-learned Chapter 0 of the ARENA AI safety program",
  content: [
    {
      type: "md",
      content:
        "I completed the first chapter of the ARENA AI safety course to build foundational knowledge in AI safety and machine learning fundamentals.\n\nI originally planned to complete the entire course, but decided to pivot after the first chapter when I felt confident in the core concepts.\n\nMy work can be seen on [github](https://github.com/danielmccannsayles/my-arena). The course material covers essential topics in tensor operations, PyTorch fundamentals, neural network architecture, and the training process including optimization and backpropagation.",
    },
    {
      type: "code",
      contents: [
        {
          content: "import torch\nimport torch.nn as nn\nimport torch.optim as optim\n\n# Example neural network implementation from ARENA\nclass SimpleNN(nn.Module):\n    def __init__(self, input_size, hidden_size, output_size):\n        super(SimpleNN, self).__init__()\n        self.fc1 = nn.Linear(input_size, hidden_size)\n        self.fc2 = nn.Linear(hidden_size, output_size)\n        self.relu = nn.ReLU()\n    \n    def forward(self, x):\n        x = self.relu(self.fc1(x))\n        x = self.fc2(x)\n        return x",
          language: "python"
        },
        {
          content: "# Training loop fundamentals\nmodel = SimpleNN(784, 128, 10)\ncriterion = nn.CrossEntropyLoss()\noptimizer = optim.SGD(model.parameters(), lr=0.01)\n\n# Training step\nfor epoch in range(num_epochs):\n    for batch in dataloader:\n        optimizer.zero_grad()\n        outputs = model(batch.data)\n        loss = criterion(outputs, batch.labels)\n        loss.backward()\n        optimizer.step()",
          language: "python"
        }
      ]
    },
    {
      type: "md",
      content:
        "I found this extremely helpful for shoring up my fundamental knowledge of Tensors, PyTorch, and neural networks. The hands-on approach of implementing everything from scratch was challenging but rewarding.\n\nThe focus on building everything myself gave me much more confidence when working on ML projects and using PyTorch. I now have significantly more context when reading AI research papers and understanding the underlying mechanisms.\n\nKey areas covered included tensor manipulation, automatic differentiation, neural network layers, loss functions, optimizers, and training loops. The practical exercises reinforced theoretical concepts through implementation.\n\nThis foundation has proven invaluable for subsequent AI projects and my broader understanding of machine learning systems. The emphasis on understanding rather than just using libraries aligns well with my learning philosophy.\n\nWhile I didn't complete the full program, Chapter 0 provided exactly the depth I needed to confidently engage with AI safety concepts and continue my journey in this field.",
    },
  ],
};