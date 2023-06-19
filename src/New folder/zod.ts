import { z } from "zod";

const Data = z.object({
  id: z.string(),
  name: z.string(),
});

type DataType = z.infer<typeof Data>;
