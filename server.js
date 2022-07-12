/** @format */
const { PrismaClient } = require("@prisma/client");
const express = require("express");
const app = express();
const multer = require("multer");
const cors = require("cors");
const fs = require("fs");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `${process.cwd()}/uploads`);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + file.originalname;
    let type = "";
    if (file.mimetype === "application/octet-stream") type = "jpg";
    cb(null, uniqueSuffix);
  },
});

const upload = multer({ storage });
const prisma = new PrismaClient();

app.use(cors());
app.use(express.static("."));

app.post("/api/upload", upload.single("fileupload"), async (req, res) => {
  try {
    const fileupload = await prisma.FilesList.create({
      data: {
        file_name: req.file.filename,
        path: `/uploads/${req.file.filename}`,
      },
    });
    res.status(200).send(fileupload);
  } catch (error) {
    res.status(400).send("Upload failed");
  }
});

app.get("/api/get", async (req, res) => {
  res.status(200).send("port 3000");
});

app.get("/api/getFiles", async (req, res) => {
  try {
    const FilesList = await prisma.FilesList.findMany();
    res.status(200).send(FilesList);
  } catch (error) {
    res.status(400).send("loading failed");
  }
});

app.delete("/api/deleteFiles/:id", async (req, res) => {
  try {
    let FilesId = req.params.id;
    const deleteUser = await prisma.FilesList.delete({
      where: {
        id: Number(FilesId),
      },
    });
    let filePath = deleteUser.path;
    fs.unlinkSync(`${process.cwd()}${filePath}`);
    res.status(200).send(deleteUser);
  } catch (error) {
    res.status(400).send("not Found");
  }
});

let PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`server listening on ${PORT}`);
});

/**
 * Code first
 *
 */
