/** @format */

// schema.ts
import {
  pgTable,
  serial,
  text,
  varchar,
  timestamp,
  uuid,
  json,
} from 'drizzle-orm/pg-core';

// Define User Table
export const PersonalInfo = pgTable('personal_info', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }),
  subtitle: text('subtitle'), // Changed to text type for longer content
  bio: text('bio'),
  profile_image: varchar('profile_image', { length: 255 }),
  contact_email: varchar('contact_email', { length: 255 }),
  social_links: json('social_links').notNull(),
});

// Define Project Table
export const Projects = pgTable('projects', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: varchar('title', { length: 255 }),
  description: text('description'),
  tech_stack: json('tech_stack'),
  project_link: varchar('project_link', { length: 255 }),
  image: varchar('image', { length: 255 }).notNull(),
  video_url: varchar('video_url', { length: 255 }), // New video URL field
  type: varchar('type', { length: 50 }), // Android, Web, Backend
  start_date: timestamp('start_date').notNull(),
  end_date: timestamp('end_date').notNull(),
});

// Define Blogs Table
export const Blogs = pgTable('blogs', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: varchar('title', { length: 255 }),
  content: text('content'),
  published_at: timestamp('published_at'),
  author_id: uuid('author_id').references(() => PersonalInfo.id), // Foreign key to User
  tags: json('tags'),
  slug: varchar('slug', { length: 255 }),
});

// Define Experience Table
export const Experience = pgTable('experience', {
  id: uuid('id').primaryKey().defaultRandom(),
  company_name: varchar('company_name', { length: 255 }), // Company name
  company_logo: varchar('company_logo', { length: 255 }).notNull(), // Company logo URL
  role: varchar('role', { length: 255 }), // Job role/title
  start_date: timestamp('start_date').notNull(), // Joining date
  end_date: timestamp('end_date').notNull(), // End date (null if currently working)
  description: text('description'), // Role description
  personal_info_id: uuid('personal_info_id').references(() => PersonalInfo.id), // Foreign key to User
});

// Define Skills Table
export const Skills = pgTable('skills', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 100 }), // Skill name
  level: varchar('level', { length: 50 }), // Skill proficiency level (e.g., Beginner, Intermediate, Advanced)
  personal_info_id: uuid('personal_info_id').references(() => PersonalInfo.id), // Foreign key to User
});

// Define Testimonials Table
export const Testimonials = pgTable('testimonials', {
  id: uuid('id').primaryKey().defaultRandom(),
  author: varchar('author', { length: 255 }), // Name of the person giving the testimonial
  content: text('content'), // The testimonial content
  position: varchar('position', { length: 255 }), // Author's position/title
  company: varchar('company', { length: 255 }), // Author's company name
  imageURL: varchar('imageURL', { length: 255 }), // Author's company name
});

// Define Education Table
export const Education = pgTable('education', {
  id: uuid('id').primaryKey().defaultRandom(),
  institution_name: varchar('institution_name', { length: 255 }), // Name of the educational institution
  degree: varchar('degree', { length: 255 }), // Degree obtained
  field_of_study: varchar('field_of_study', { length: 255 }), // Field of study
  start_date: varchar('start_date', { length: 4 }).notNull(), // Only the year (e.g., "2018")
  end_date: varchar('end_date', { length: 4 }).notNull(), // Only the year (e.g., "2023")
  personal_info_id: uuid('personal_info_id').references(() => PersonalInfo.id), // Foreign key to User
  imageURL: text('imageURL'), // Image URL
  institution_url: text('institution_url'),
});

// Define Contact Messages Table
export const ContactMessages = pgTable('contact_messages', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }), // Name of the person contacting you
  email: varchar('email', { length: 255 }), // Email of the person
  message: text('message'), // The message content
  created_at: timestamp('created_at').defaultNow(), // Timestamp of when the message was sent
});

// Define Settings Table
export const Settings = pgTable('settings', {
  id: uuid('id').primaryKey().defaultRandom(),
  key: varchar('key', { length: 255 }), // Key name for the setting
  value: text('value'), // Value associated with the key
});

// Default export object containing all the tables
export default {
  PersonalInfo,
  Projects,
  Blogs,
  Experience,
  Skills,
  Testimonials,
  Education,
  ContactMessages,
  Settings,
};
