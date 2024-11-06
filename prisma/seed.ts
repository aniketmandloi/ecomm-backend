import prisma from "../src/prisma";

async function main() {
  // Clear existing products if you want a fresh start each time you run the seed
  await prisma.product.deleteMany();

  // Sample data to populate the Product table
  const sampleProducts = [
    {
      name: "Product A",
      price: 1999, // BigInt values in cents (e.g., $19.99)
      description: "High-quality product A for everyday use",
    },
    {
      name: "Product B",
      price: 2999,
      description: "Premium product B with advanced features",
    },
    {
      name: "Product C",
      price: 4999,
      description: "Product C with exceptional durability",
    },
    {
      name: "Product D",
      price: 999,
      description: "Affordable product D for budget-conscious customers",
    },
    {
      name: "Product E",
      price: 1599,
      description: "Versatile product E for multi-purpose use",
    },
    // Add more products if needed
  ];

  // Create sample products in the database
  for (const product of sampleProducts) {
    await prisma.product.create({
      data: product,
    });
  }

  console.log("Sample products added successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
