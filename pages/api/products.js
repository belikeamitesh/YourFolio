import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();

  if (method === "GET") {
    if (req.query?.id) {
      res.json(await Product.findOne({ _id: req.query.id }));
    } else {
      res.json(await Product.find());
    }
  }
  if (method === "POST") {
    const {
      name,
      about,
      phoneNumber,
      socialLink,
      experiences,
      education,
      projects,
      selectedSkills,
      selectedProf,
      dob,
      cv,
      emailid,
      location,
    } = req.body;
    const productDoc = await Product.create({
      name,
      about,
      phoneNumber,
      socialLink,
      experiences,
      education,
      projects,
      selectedSkills,
      selectedProf,
      dob,
      cv,
      emailid,
      location,
    });
    res.json(productDoc);
  }
  if (method === "PUT") {
    const {
      name,
      about,
      phoneNumber,
      socialLink,
      experiences,
      education,
      projects,
      selectedSkills,
      selectedProf,
      dob,
      cv,
      emailid,
      location,
      _id,
    } = req.body;
    await Product.updateOne(
      { _id },
      {
        name,
        about,
        phoneNumber,
        socialLink,
        experiences,
        education,
        projects,
        selectedSkills,
        selectedProf,
        dob,
        cv,
        emailid,
        location,
      }
    );
    res.json(true);
  }
  if (method === "DELETE") {
    if (req.query?.id) {
      await Product.deleteOne({ _id: req.query?.id });
      res.json(true);
    }
  }
}
