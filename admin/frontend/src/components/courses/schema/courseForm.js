import * as Yup from "yup";

export const Schema = Yup.object().shape({
  title: Yup.string().min(2, "Too Short!").required("Title is required"),
  description: Yup.string().required("Description is required"),
  price: Yup.number().required("Price is required"),
});
