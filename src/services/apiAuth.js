import { supabase, supabaseUrl } from "./supabase";

export async function signup({ fullName, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { fullName } },
  });

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
  return data;
}

export async function login({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
  return data;
}

export async function getUser() {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
  return user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
}

export async function updateUser({ password, fullName, avatar }) {
  const newData = { data: {} };
  if (password) newData.password = password;
  if (fullName) newData.data.fullName = fullName;
  if (avatar) {
    newData.data.avatar = await uploadAvatar(avatar);
  }

  const { data, error } = await supabase.auth.updateUser(newData);
  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
  return data;
}

const generateFileName = (fileName) =>
  `${crypto.randomUUID()}-${fileName}`.replaceAll("/", "");

const generateFilePath = (fileName) =>
  `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`;

async function uploadAvatar(avatar) {
  const isNewImage = typeof avatar === "object";

  if (!isNewImage) return avatar;

  const fileName = generateFileName(avatar.name);
  const filePath = generateFilePath(fileName);

  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (storageError) {
    console.error(storageError.message);
    throw new Error("Could not upload avatar image");
  }

  return filePath;
}
