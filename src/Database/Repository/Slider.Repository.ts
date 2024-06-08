import Unique from '../../Utils/Crypto';
import { sliderInsert } from '../../Types/Slider';
import { AppDataSource } from '../Connection';
import { Slider } from '../Models/Slider';

export const insertSlider = async (
  { title }: sliderInsert,
  image: string
): Promise<Slider> => {
  try {
    const repo = AppDataSource.getRepository(Slider);
    const addSlider = await repo.save({
      _id: Unique(),
      title,
      image,
    });
    return addSlider;
  } catch (error) {
    throw error;
  }
};

export const getSliderById = async (_id: string): Promise<Slider | null> => {
  try {
    const repo = AppDataSource.getRepository(Slider);
    const getSlider = await repo.findOne({ where: { _id } });
    return getSlider;
  } catch (error) {
    throw error;
  }
};

export const deleteSlider = async (slider: Slider): Promise<Slider> => {
  try {
    const repo = AppDataSource.getRepository(Slider);
    const remove = await repo.remove(slider);
    return remove;
  } catch (error) {
    throw error;
  }
};

export const getSliders = async (): Promise<Slider[] | null> => {
  try {
    const repo = AppDataSource.getRepository(Slider);
    const getSlider = await repo.find();
    return getSlider;
  } catch (error) {
    throw error;
  }
};
