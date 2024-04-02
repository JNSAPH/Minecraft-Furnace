import gradientString from 'gradient-string';
import { TITLE_TEXT } from '@/consts/consts';

const Theme = gradientString([
    "#ff00ff",
    "#D49815"
  ]);

export const renderTitle = () => {
    const coolString = Theme(TITLE_TEXT);
    console.log(coolString);
}