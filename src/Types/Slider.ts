import { z } from 'zod';
import { sliderInsertSchema, sliderUpdateSchema } from '../Schema/Slider.Schema';


export type sliderInsert = z.infer<typeof sliderInsertSchema>;
export type sliderUpdate = z.infer<typeof sliderUpdateSchema>;
