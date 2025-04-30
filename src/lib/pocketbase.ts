import type { BaseSheet } from "@/types/base-game";
import PocketBase from "pocketbase";

export const pb = new PocketBase("http://localhost:8090");

export const createSheet = async (sheet: BaseSheet) => {
  try {
    await pb.collection("sheets").create(sheet);
  } catch (error) {
    console.error(error);
  }
};

export const updateSheet = async (id: string, sheet: BaseSheet) => {
  try {
    await pb.collection("sheets").update(id, sheet);
  } catch (error) {
    console.error(error);
  }
};
