import thali from "@/assets/food-thali.jpg";
import idli from "@/assets/food-idli.jpg";
import butterChicken from "@/assets/food-butter-chicken.jpg";
import paratha from "@/assets/food-paratha.jpg";
import samosa from "@/assets/food-samosa.jpg";
import chefPriya from "@/assets/chef-priya.jpg";
import chefSunita from "@/assets/chef-sunita.jpg";
import chefAnjali from "@/assets/chef-anjali.jpg";

export const images = { thali, idli, butterChicken, paratha, samosa, chefPriya, chefSunita, chefAnjali };

export type Dish = {
  id: string;
  name: string;
  chef: string;
  chefId: string;
  price: number;
  rating: number;
  reviews: number;
  time: string;
  img: string;
  veg: boolean;
  healthy?: boolean;
  category: string;
  description: string;
  distance: string;
};

export const dishes: Dish[] = [
  { id: "d1", name: "Homemade Veg Thali", chef: "Priya's Kitchen", chefId: "c1", price: 149, rating: 4.8, reviews: 324, time: "25 min", img: thali, veg: true, healthy: true, category: "Lunch", distance: "0.8 km", description: "A wholesome thali with dal, sabzi, rice, 2 rotis, salad, and homemade pickle. Cooked fresh every day in a home kitchen." },
  { id: "d2", name: "Soft Idli & Sambar", chef: "Anjali Home Foods", chefId: "c3", price: 89, rating: 4.7, reviews: 211, time: "20 min", img: idli, veg: true, healthy: true, category: "Breakfast", distance: "1.2 km", description: "Fluffy steamed idlis served with piping hot sambar and fresh coconut chutney." },
  { id: "d3", name: "Butter Chicken with Naan", chef: "Sunita Aunty's", chefId: "c2", price: 229, rating: 4.9, reviews: 502, time: "35 min", img: butterChicken, veg: false, category: "Dinner", distance: "1.5 km", description: "Slow-cooked butter chicken in rich tomato-cream gravy, served with two soft butter naans." },
  { id: "d4", name: "Aloo Paratha Combo", chef: "Priya's Kitchen", chefId: "c1", price: 119, rating: 4.6, reviews: 188, time: "20 min", img: paratha, veg: true, healthy: true, category: "Breakfast", distance: "0.8 km", description: "Two stuffed aloo parathas with butter, served with curd and mango pickle." },
  { id: "d5", name: "Masala Chai & Samosa", chef: "Sunita Aunty's", chefId: "c2", price: 59, rating: 4.5, reviews: 412, time: "15 min", img: samosa, veg: true, category: "Snacks", distance: "1.5 km", description: "Two crispy hand-folded samosas with mint chutney and a hot cup of masala chai." },
  { id: "d6", name: "Special Dinner Thali", chef: "Anjali Home Foods", chefId: "c3", price: 199, rating: 4.8, reviews: 156, time: "30 min", img: thali, veg: true, healthy: true, category: "Dinner", distance: "1.2 km", description: "Premium thali with paneer sabzi, dal makhani, jeera rice, 3 rotis, raita and sweet." },
];

export type Chef = {
  id: string;
  name: string;
  avatar: string;
  speciality: string;
  rating: number;
  orders: number;
  distance: string;
  badge?: string;
};

export const chefs: Chef[] = [
  { id: "c1", name: "Priya Sharma", avatar: chefPriya, speciality: "North Indian, Healthy Meals", rating: 4.8, orders: 1240, distance: "0.8 km", badge: "Homemade Hero" },
  { id: "c2", name: "Sunita Aunty", avatar: chefSunita, speciality: "Traditional Bengali & Snacks", rating: 4.9, orders: 2105, distance: "1.5 km", badge: "Top Rated" },
  { id: "c3", name: "Anjali Verma", avatar: chefAnjali, speciality: "South Indian, Tiffin Service", rating: 4.7, orders: 890, distance: "1.2 km", badge: "Healthy" },
];

export const categories = [
  { slug: "breakfast", name: "Breakfast", emoji: "🌅" },
  { slug: "lunch", name: "Lunch", emoji: "🍛" },
  { slug: "dinner", name: "Dinner", emoji: "🍽️" },
  { slug: "snacks", name: "Snacks", emoji: "🥟" },
  { slug: "homemade", name: "Homemade", emoji: "🏡" },
  { slug: "healthy", name: "Healthy", emoji: "🥗" },
  { slug: "tiffin", name: "Tiffin", emoji: "🍱" },
  { slug: "festival", name: "Festival", emoji: "🪔" },
];
