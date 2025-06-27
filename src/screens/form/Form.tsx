import { useMemo, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { ProfileSchema, Profile } from "@/schemas/profiles";
import ProfileService from "../../services/profiles/profiles"

import FormView from "./Form.view";

const Form = () => {
  const [loading, setLoading] = useState(false)
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset
  } = useForm<Profile>({
    // resolver: zodResolver(ProfileSchema),
    resolver: async (data, context, options) => {
      console.log("formData", data)
      console.log(
        "validation result",
        await zodResolver(ProfileSchema)(data, context, options)
      )
      return zodResolver(ProfileSchema)(data, context, options)
    }
  });

  const status = watch("status")

  const allowBaptizeSection = useMemo(() => {
    return status === "active" || status === "separated"
  }, [status])

  const occupationType = watch("occupation_type")

  const allowOccupationSection = useMemo(() => {
    return occupationType && occupationType !== "nothing"
  }, [occupationType])

  const onSubmit: SubmitHandler<Profile> = async (data) => {
    console.log("Form submitted successfully:", data);
    setLoading(true)
    await ProfileService.post(data)
    alert("usuario agregado")
    setLoading(false)
    reset()
    localStorage.clear() // to refresh dashboard list
  };

  return <FormView
    loading={loading}
    onSubmit={handleSubmit(onSubmit)}
    register={register}
    errors={errors}
    allowOccupationSection={allowOccupationSection}
    allowBaptizeSection={allowBaptizeSection}
  />
}

export default Form;
