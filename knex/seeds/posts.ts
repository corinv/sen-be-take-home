import { Knex } from "knex";
import { faker } from "@faker-js/faker";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("posts").del();

  // Inserts seed entries
  await knex("posts").insert([
    {
      title: "The Art of Negotiation",
      content:
        "Negotiation is a crucial skill in the business world. Whether you're closing a deal with a client, working out a contract with a vendor, or resolving a conflict with a colleague, your ability to negotiate effectively can make or break your success. The first step in becoming a skilled negotiator is to understand the basics of negotiation.",
      user_id: 1,
      created_at: faker.date.recent(),
      updated_at: faker.date.recent(),
    },
    {
      title: "How to Build a Successful Personal Brand in the Digital Age",
      content:
        "In today's digital age, personal branding has become more important than ever. Your personal brand is the image you present to the world, and it can have a significant impact on your career prospects, your social connections, and even your self-esteem.",
      user_id: 2,
      created_at: faker.date.recent(),
      updated_at: faker.date.recent(),
    },
    {
      title: "The Importance of Emotional Intelligence in Leadership",
      content:
        "This article explores the significance of emotional intelligence in leadership and how it can impact the overall performance of a team or organization. It covers key aspects of emotional intelligence, such as self-awareness, empathy, and effective communication, and provides tips for developing these skills.",
      user_id: 3,
      created_at: faker.date.recent(),
      updated_at: faker.date.recent(),
    },
    {
      title:
        "10 Effective Time Management Techniques for Increased Productivity",
      content:
        "Time management is essential for achieving productivity and success in both personal and professional life. This article provides ten proven techniques for managing time effectively, such as prioritizing tasks, using productivity tools, and setting realistic goals.",
      user_id: 1,
      created_at: faker.date.recent(),
      updated_at: faker.date.recent(),
    },
    {
      title: "The Future of Work",
      content:
        "Automation and AI are transforming the way we work, and this article examines the potential impact on the job market. It discusses the benefits and challenges of automation, as well as the skills that will be in demand in the future.",
      user_id: 2,
      created_at: faker.date.recent(),
      updated_at: faker.date.recent(),
    },
    {
      title: "The Benefits and Risks of a Plant-Based Diet",
      content:
        "Plant-based diets are becoming increasingly popular, but they come with both benefits and risks. This article examines the potential health benefits of a plant-based diet, such as reduced risk of chronic diseases, as well as potential drawbacks, such as nutrient deficiencies.",
      user_id: 3,
      created_at: faker.date.recent(),
      updated_at: faker.date.recent(),
    },
    {
      title: "5 Ways to Boost Your Creativity and Overcome Creative Blocks",
      content:
        "Creativity is essential for innovation and success, but it can be difficult to tap into at times. This article provides five practical tips for boosting creativity and overcoming creative blocks, such as changing your environment, trying new things, and taking breaks.",
      user_id: 4,
      created_at: faker.date.recent(),
      updated_at: faker.date.recent(),
    },
    {
      title: "The Psychology of Procrastination",
      content:
        "Procrastination can be a major obstacle to achieving our goals, but it's not just a matter of laziness. This article explores the psychology of procrastination, including the role of delayed gratification, and provides strategies for overcoming it.",
      user_id: 5,
      created_at: faker.date.recent(),
      updated_at: faker.date.recent(),
    },
    {
      title: "The Impact of Social Media on Mental Health",
      content:
        "Social media has become an integral part of our daily lives, but it also has a significant impact on our mental health. This article explores common myths and facts about the impact of social media on mental health, as well as tips for using social media in a healthy way.",
      user_id: 1,
      created_at: faker.date.recent(),
      updated_at: faker.date.recent(),
    },
    {
      title: "Investing in Cryptocurrencies",
      content:
        "Cryptocurrencies have become a popular investment option, but they come with both opportunities and risks. This article explores the basics of cryptocurrency investing, as well as the potential benefits and pitfalls to be aware of.",
      user_id: 2,
      created_at: faker.date.recent(),
      updated_at: faker.date.recent(),
    },
  ]);
}
