"use server";

import { database } from "@/db/database";
import { categories } from "@/db/schema";
import { revalidatePath } from "next/cache";
import crypto from "crypto";

export type Category = typeof categories.$inferSelect;

export async function addCategory(formData: FormData): Promise<void> {
  const name = formData.get("name");

  if (!name || typeof name !== "string") {
    throw new Error("Invalid category name");
  }

  try {
    const query = {
      text: `
        INSERT INTO categories (id, name, created_at)
        VALUES ($1, $2, $3)
        RETURNING *
      `,
      values: [
        crypto.randomUUID(), // Generate UUID for id
        name.trim(),
        new Date().toISOString(),
      ],
    };

    const result = await database.query(query);

    if (result.rowCount === 0) {
      throw new Error("Failed to add category");
    }

    revalidatePath("/dashboard/categories");
  } catch (error) {
    console.error("Database error:", error);
    // If it's a unique constraint violation, provide a more specific error
    if (error instanceof Error && error.message.includes("unique constraint")) {
      throw new Error("A category with this name already exists");
    }
    throw new Error("Failed to add category");
  }
}

export async function getCategories(): Promise<{
  success: boolean;
  categories: Category[];
}> {
  try {
    const result = await database.query(`
      SELECT
        id,
        name,
        created_at
      FROM categories
      ORDER BY created_at DESC
    `);

    return {
      success: true,
      categories: result.rows.map(row => ({
        ...row,
        created_at:
          row.created_at instanceof Date ? row.created_at.toISOString() : row.created_at,
      })),
    };
  } catch (error) {
    console.error("Database error:", error);
    return { success: false, categories: [] };
  }
}
