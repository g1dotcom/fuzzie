import { WorkflowFormSchema } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useModal } from "@/providers/modal-provider";

type Props = {
  title?: string;
  subTitle?: string;
};

const Workflowform = ({ subTitle, title }: Props) => {
  const { setClose } = useModal();
  const form = useForm<z.infer<typeof WorkflowFormSchema>>({
    mode: "onChange",
    resolver: zodResolver(WorkflowFormSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const isLoading = form.formState.isLoading;
  const router = useRouter();

  return <div></div>;
};

export default Workflowform;
