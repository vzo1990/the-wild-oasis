import { supabase, supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error.message);
    throw new Error("Could not get cabins");
  }

  return data;
}

export async function deleteCabin(id) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.error(error.message);
    throw new Error("Could not delete cabin");
  }
}

const generateFileName = (fileName) =>
  `${crypto.randomUUID()}-${fileName}`.replaceAll("/", "");

const generateFilePath = (fileName) =>
  `${supabaseUrl}/storage/v1/object/public/cabin-images/${fileName}`;

async function uploadCabinImage(image) {
  const isNewImage = typeof image === "object";

  if (!isNewImage) return image;

  const fileName = generateFileName(image[0].name);
  const filePath = generateFilePath(fileName);

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(fileName, image[0]);

  if (storageError) {
    console.error(storageError.message);
    throw new Error("Could not upload cabin image");
  }

  return filePath;
}

export async function createCabin(formData) {
  const filePath = await uploadCabinImage(formData.image);

  const { error } = await supabase
    .from("cabins")
    .insert([{ ...formData, image: filePath }]);

  if (error) {
    console.error(error.message);
    throw new Error("Could not create cabin");
  }
}

export async function updateCabin({ id, created_at, ...cabin }) {
  const filePath = await uploadCabinImage(cabin.image);

  const { error } = await supabase
    .from("cabins")
    .update({ ...cabin, image: filePath })
    .eq("id", id);

  if (error) {
    console.error(error.message);
    throw new Error("Could not update cabin");
  }
}
