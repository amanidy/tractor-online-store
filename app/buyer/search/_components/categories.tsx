"use client";
import { Category } from "@prisma/client";

import {
    FcSettings,
  FcGlobe,
  FcShop,
  FcEngineering,
  FcInspection,
  FcElectricity,
  FcMoneyTransfer


} from "react-icons/fc";

import { IconType } from "react-icons";
import { CategoryItem } from "./category-item";

interface CategoriesProps{
    items: Category[];

}

const iconMap: Record<Category["name"], IconType> = {
    "Accessories and Implements" : FcSettings,
      "Tractors by Region" : FcGlobe,
      "Tractors by Brand" : FcShop ,
      "Tractors by Type" : FcEngineering,
      "Tractors by Usage" : FcInspection,
      "Tractors by Horsepower" : FcElectricity,
      "Budget Categories" : FcMoneyTransfer,                             
}

export const Categories = ({
    items,
}:CategoriesProps) => {
    return (
        <div className="flex items-center gap-x-2 overflow-x-auto p-2 ">
            {items.map((item) => (
                <CategoryItem
                    key={item.id}
                    label={item.name}
                    icon={iconMap[item.name]}
                    value ={item.id}
             
                />
         ))}
        </div>
    )
}