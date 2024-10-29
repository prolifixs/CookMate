"use client"

import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image';
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import { Tabs, TabsList, TabsTrigger } from "../components/ui/tabs"
import { Badge } from "../components/ui/badge"
import { Card, CardContent } from "../components/ui/card"
import { ScrollArea } from "../components/ui/scroll-area"
import { Send, ChevronLeft, Heart, Bookmark, Search, X, ChevronDown, Check, MessageSquare } from 'lucide-react'
import { Checkbox } from "../components/ui/checkbox"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} 
from "../components/ui/alert-dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select"
import { Progress } from "../components/ui/progress"
import { Star } from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion"

const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

const mealTypes = [
  { type: 'Breakfast', color: 'bg-gray-300' },
  { type: 'Lunch', color: 'bg-blue-500' },
  { type: 'Dinner', color: 'bg-black' }
]

const fixedWeekMeals = {
  Sunday: [
    { id: 1, name: "Bacon and Eggs", color: mealTypes[0].color },
    { id: 2, name: "Chicken Salad", color: mealTypes[1].color },
    { id: 3, name: "Spaghetti and Meatballs", color: mealTypes[2].color }
  ],
  Monday: [
    { id: 1, name: "Oatmeal", color: mealTypes[0].color },
    { id: 2, name: "Veggie Wrap", color: mealTypes[1].color },
    { id: 3, name: "Grilled Salmon", color: mealTypes[2].color }
  ],
  Tuesday: [
    { id: 1, name: "Oatmeal", color: mealTypes[0].color },
    { id: 2, name: "Veggie Wrap", color: mealTypes[1].color },
    { id: 3, name: "Grilled Salmon", color: mealTypes[2].color }
  ],
  Wednesday: [
    { id: 1, name: "Oatmeal", color: mealTypes[0].color },
    { id: 2, name: "Veggie Wrap", color: mealTypes[1].color },
    { id: 3, name: "Grilled Salmon", color: mealTypes[2].color }
  ],
  Thursday: [
    { id: 1, name: "Oatmeal", color: mealTypes[0].color },
    { id: 2, name: "Veggie Wrap", color: mealTypes[1].color },
    { id: 3, name: "Grilled Salmon", color: mealTypes[2].color }
  ],
  Friday: [
    { id: 1, name: "Oatmeal", color: mealTypes[0].color },
    { id: 2, name: "Veggie Wrap", color: mealTypes[1].color },
    { id: 3, name: "Grilled Salmon", color: mealTypes[2].color }
  ],
  Saturday: [
    { id: 1, name: "Oatmeal", color: mealTypes[0].color },
    { id: 2, name: "Veggie Wrap", color: mealTypes[1].color },
    { id: 3, name: "Grilled Salmon", color: mealTypes[2].color }
  ],
};

const initialRecipeItems: RecipeItem[] = [
  { id: 1, item: "Macaroni", amtQty: "500g", caloriesPer100g: 371, allergy: "Gluten", inventory: "1kg", availability: 85, isIgnored: false, useAlternative: false, alternative: null },
  { id: 2, item: "Cheddar Cheese", amtQty: "200g", caloriesPer100g: 402, allergy: "Dairy", inventory: "500g", availability: 25, isIgnored: false, useAlternative: false, alternative: null },
  { id: 3, item: "Milk", amtQty: "250ml", caloriesPer100ml: 42, allergy: "Dairy", inventory: "2L", availability: 50, isIgnored: false, useAlternative: false, alternative: null },
  { id: 4, item: "Butter", amtQty: "50g", caloriesPer100g: 717, allergy: "Dairy", inventory: "250g", availability: 5, isIgnored: false, useAlternative: false, alternative: null },
  { id: 5, item: "Flour", amtQty: "30g", caloriesPer100g: 364, allergy: "Gluten", inventory: "1kg", availability: 75, isIgnored: false, useAlternative: false, alternative: null },
];

const alternativeOptions = [
  { value: "gluten-free-pasta", label: "Gluten-free Pasta" },
  { value: "almond-milk", label: "Almond Milk" },
  { value: "vegan-cheese", label: "Vegan Cheese" },
  { value: "coconut-oil", label: "Coconut Oil" },
  { value: "rice-flour", label: "Rice Flour" },
];

const getAvailabilityStatus = (availability: number) => {
  if (availability < 10) return { status: "critical low", color: "bg-red-500" };
  if (availability < 30) return { status: "low", color: "bg-orange-500" };
  if (availability < 60) return { status: "mid", color: "bg-gray-500" };
  return { status: "in stock", color: "bg-green-500" };
}

const handleAddToGroceryList = (item: string) => {
  // This is where you would implement the logic to add the item to the grocery list
  console.log(`Added ${item} to grocery list`);
};

// Add this type at the top with other type definitions
type DayOfWeek = 'Sunday' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';

// Update the EditingMeal type
type EditingMeal = {
  day: DayOfWeek | null;
  id: number | null;
}

// Update the MealToChange type
type MealToChange = {
  day: DayOfWeek | null;
  id: number | null;
  newName: string;
  oldName: string;
}

// Add this type definition at the top with other types
type WeekMeals = {
  [K in DayOfWeek]: { id: number; name: string; color: string; }[]
};

// Update the RecipeItem type definition
type RecipeItem = {
  id: number;
  item: string;
  amtQty: string;
  caloriesPer100g?: number;
  caloriesPer100ml?: number;
  allergy: string;
  inventory: string;
  availability: number;
  isIgnored: boolean;
  useAlternative: boolean;
  alternative: string | null;
}

export default function Component() {
  const [activeTab, setActiveTab] = useState('daily')
  const [weekMeals, setWeekMeals] = useState<WeekMeals>(fixedWeekMeals);
  const [editingMeal, setEditingMeal] = useState<EditingMeal>({ day: null, id: null })
  const [mealToChange, setMealToChange] = useState<MealToChange>({ day: null, id: null, newName: '', oldName: '' })
  const [confirmationOpen, setConfirmationOpen] = useState(false)
  const [recipeItems, setRecipeItems] = useState(initialRecipeItems);
  const [editingItem, setEditingItem] = useState<number | null>(null);
  const [allergyPopupOpen, setAllergyPopupOpen] = useState(false);
  const [selectedAllergyItem, setSelectedAllergyItem] = useState<RecipeItem | null>(null);
  const [editedAlternatives, setEditedAlternatives] = useState<Record<number, boolean>>({});
  const [servings, setServings] = useState("1")
  const editInputRef = useRef<HTMLInputElement>(null)
  const currentDayRef = useRef<HTMLDivElement>(null)

  const currentDay = daysOfWeek[new Date().getDay()]

  useEffect(() => {
    if (editingMeal.day !== null && editingMeal.id !== null && editInputRef.current) {
      editInputRef.current.focus()
    }
  }, [editingMeal])

  useEffect(() => {
    if (currentDayRef.current) {
      currentDayRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [])

  const handleMealEditStart = (day: DayOfWeek, id: number, currentName: string) => {
    setEditingMeal({ day, id })
    setMealToChange({ day, id, newName: currentName, oldName: currentName })
  }

  const handleMealEditChange = (newName: string) => {
    setMealToChange(prev => ({ ...prev, newName }))
  }

  const handleMealEditEnd = () => {
    if (mealToChange.newName !== mealToChange.oldName) {
      setConfirmationOpen(true)
    } else {
      setEditingMeal({ day: null, id: null })
    }
  }

  const confirmMealChange = () => {
    if (mealToChange.day && mealToChange.day in weekMeals) {
      setWeekMeals(prevWeekMeals => ({
        ...prevWeekMeals,
        [mealToChange.day as DayOfWeek]: prevWeekMeals[mealToChange.day as DayOfWeek].map(meal =>
          meal.id === mealToChange.id ? { ...meal, name: mealToChange.newName } : meal
        )
      }))
    }
    setEditingMeal({ day: null, id: null })
    setConfirmationOpen(false)
  }

  const cancelMealChange = () => {
    setEditingMeal({ day: null, id: null })
    setConfirmationOpen(false)
  }

  const getMealType = (id: number) => {
    if (id === 1) return 'breakfast'
    if (id === 2) return 'lunch'
    if (id === 3) return 'dinner'
    return 'unknown'
  }

  const calculateCalories = (item: RecipeItem) => {
    const amount = parseFloat(item.amtQty);
    const caloriesPer100 = item.caloriesPer100g || item.caloriesPer100ml || 0;
    return Math.round((amount / 100) * caloriesPer100 * parseInt(servings));
  }

  const handleItemEdit = (id: number, value: string) => {
    setRecipeItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, amtQty: value } : item
      )
    );
  }

  const handleItemEditStart = (id: number) => {
    setEditingItem(id);
  }

  const handleItemEditEnd = () => {
    setEditingItem(null);
  }

  const handleAllergyCheckbox = (id: number) => {
    const item = recipeItems.find(item => item.id === id);
    if (item) {
      if (item.isIgnored || item.useAlternative) {
        setRecipeItems(prevItems =>
          prevItems.map(prevItem =>
            prevItem.id === id ? { ...prevItem, isIgnored: false, useAlternative: false } : prevItem
          )
        );
        setActiveTab(activeTab);
      } else {
        setSelectedAllergyItem(item);
        setAllergyPopupOpen(true);
      }
    }
  }

  const handleAllergyAction = (action: 'ignore' | 'alternative') => {
    if (selectedAllergyItem) {
      setRecipeItems(prevItems =>
        prevItems.map(item =>
          item.id === selectedAllergyItem.id
            ? action === 'ignore'
              ? { ...item, isIgnored: true, useAlternative: false }
              : { ...item, isIgnored: false, useAlternative: true }
            : item
        )
      );
      setAllergyPopupOpen(false);
      setActiveTab(activeTab);
    }
  }

  const handleAlternativeChange = (itemId: number, newAlternative: string | null) => {
    setRecipeItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId ? { ...item, alternative: newAlternative } : item
      )
    );
    setEditedAlternatives(prev => ({ ...prev, [itemId]: true }));
  };

  const handleConfirmAlternative = (itemId: number) => {
    setEditedAlternatives(prev => ({ ...prev, [itemId]: false }));
  };

  const handleIgnoreAlternative = (itemId: number) => {
    setRecipeItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId ? { ...item, isIgnored: true, useAlternative: false } : item
      )
    );
  }

  const handleServingsChange = (value: string) => {
    setServings(value)
  }

  const getAdjustedAmtQty = (item: RecipeItem) => {
    const match = item.amtQty.match(/^(\d+(?:\.\d+)?)\s*([a-zA-Z]+)$/);
    if (match) {
      const [, amount, unit] = match;
      const adjustedAmount = parseFloat(amount) * parseInt(servings);
      return `${adjustedAmount}${unit}`;
    }
    return item.amtQty;
  }

  const [rating] = useState("4.2");

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white p-4 border-r flex flex-col">
        <h2 className="text-2xl font-bold mb-4">My Meal Plan</h2>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mb-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="daily">Daily</TabsTrigger>
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
          </TabsList>
        </Tabs>
        <button className="text-sm text-gray-500 mb-4 block">View All</button>
        <ScrollArea className="flex-1">
          {daysOfWeek.map(day => (
            <Card
              key={day}
              className={`mb-4 last:mb-0 ${day === currentDay ? 'bg-green-200' : ''}`}
              ref={day === currentDay ? currentDayRef : null}
            >
              <CardContent className="p-4">
                <h3 className="font-semibold mb-2">{day}</h3>
                <ul className="space-y-2">
                  {weekMeals[day as DayOfWeek] && weekMeals[day as DayOfWeek].map(meal => (
                    <li key={meal.id} className="flex items-center">
                      <span className={`w-2 h-2 ${meal.color} rounded-full mr-2`}></span>
                      {editingMeal.day === day && editingMeal.id === meal.id ? (
                        <Input
                          ref={editInputRef}
                          value={mealToChange.newName}
                          onChange={(e) => handleMealEditChange(e.target.value)}
                          onBlur={handleMealEditEnd}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              handleMealEditEnd()
                            }
                          }}
                        />
                      ) : (
                        <span
                          className="flex-1 cursor-text"
                          onClick={() => handleMealEditStart(day as DayOfWeek, meal.id, meal.name)}
                        >
                          {meal.name}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </ScrollArea>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white p-4 flex items-center justify-between border-b">
          <div className="flex items-center">
            <Avatar className="h-8 w-8 mr-2">
              <AvatarImage src="/placeholder-avatar.jpg" alt="MOTHERR" />
              <AvatarFallback>MO</AvatarFallback>
            </Avatar>
            <h1 className="text-xl font-bold">Cook Mate</h1>
            <Badge variant="outline" className="ml-2">online</Badge>
          </div>
          <nav className="flex items-center space-x-4">
            <a href="#" className="text-gray-600">Community</a>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="h-8 w-8 cursor-pointer">
                  <AvatarFallback>GG</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Groceries</DropdownMenuItem>
                <DropdownMenuItem>My Groceries</DropdownMenuItem>
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        </header>

        {/* Main content area */}
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-[825px] h-[178px] flex">
            <div className="w-[300px] h-full relative">
              <Image
                src="/placeholder.svg?height=178&width=300"
                alt="Mac & Cheese"
                width={300}
                height={178}
                className="rounded-lg object-cover"
              />
            </div>
            <div className="flex-1 ml-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h1 className="text-3xl font-bold">Mac & Cheese</h1>
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-400 mr-1" fill="currentColor" />
                    <span className="text-lg font-semibold">{rating}</span>
                  </div>
                </div>
                <p className="text-gray-600">
                  Create any table for me with the fields of last name, first name, address, phone, and email.
                </p>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" size="sm" className="mr-2">
                  <ChevronLeft className="h-4 w-4" />
                  <span className="sr-only">Return</span>
                </Button>
                <Button variant="outline" size="sm">
                  <Heart className="h-4 w-4" />
                  <span className="sr-only">Like</span>
                </Button>
                <Button variant="outline" size="sm">
                  <Bookmark className="h-4 w-4" />
                  <span className="sr-only">Bookmark</span>
                </Button>
                <Button variant="outline" size="sm">
                  <MessageSquare className="h-4 w-4" />
                  <span className="sr-only">Comments</span>
                </Button>
                <span className="text-sm font-medium">26</span>
              </div>
            </div>
          </div>
          <Accordion type="single" collapsible className="w-full mt-8 mb-8">
            <AccordionItem value="item-1">
              <AccordionTrigger>From the Author</AccordionTrigger>
              <AccordionContent>
                <p>Add your content here. This is a separate section for the author's notes or additional information about the recipe.</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <div className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-x-2.5">
                <h2 className="text-lg font-bold">Recipes</h2>
                <p className="text-gray-600 text-xs">
                  Please check all that applies, edit any fields for preferred amount(s).
                </p>
              </div>
              <div className="flex items-center gap-x-2">
                <span className="text-sm font-medium">Per Servings:</span>
                <Select value={servings} onValueChange={handleServingsChange}>
                  <SelectTrigger className="w-[100px]">
                    <SelectValue placeholder="Servings" />
                  </SelectTrigger>
                  <SelectContent>
                    {[...Array(10)].map((_, i) => (
                      <SelectItem key={i + 1} value={(i + 1).toString()}>
                        {i + 1} {i === 0 ? "serving" : "servings"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="w-full">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[200px]">Item</TableHead>
                    <TableHead>Amt/Qty</TableHead>
                    <TableHead>Calorie</TableHead>
                    <TableHead>Allergy</TableHead>
                    <TableHead>Inventory</TableHead>
                    <TableHead>Availability</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recipeItems.map((item) => (
                    <TableRow key={item.id} className={item.isIgnored ? 'bg-gray-200' : ''}>
                      <TableCell className="font-medium">{item.item}</TableCell>
                      <TableCell>
                        {editingItem === item.id ? (
                          <Input
                            value={item.amtQty}
                            onChange={(e) => handleItemEdit(item.id, e.target.value)}
                            onBlur={handleItemEditEnd}
                            autoFocus
                          />
                        ) : (
                          <span onClick={() => handleItemEditStart(item.id)} className="cursor-pointer">
                            {getAdjustedAmtQty(item)}
                          </span>
                        )}
                      </TableCell>
                      <TableCell>{calculateCalories(item)}</TableCell>
                      <TableCell>
                        <Checkbox
                          checked={item.isIgnored || item.useAlternative}
                          onCheckedChange={() => handleAllergyCheckbox(item.id)}
                        />
                        {item.useAlternative && <span className="ml-2">Alternative</span>}
                      </TableCell>
                      <TableCell>{item.inventory}</TableCell>
                      <TableCell>
                        <div className="w-full max-w-xs">
                          <Progress 
                            value={item.availability} 
                            className={`w-full ${getAvailabilityStatus(item.availability).color}`} 
                          />
                          <div className="flex justify-between items-center mt-1">
                            <span className="text-xs text-muted-foreground">
                              {getAvailabilityStatus(item.availability).status}
                            </span>
                            {item.availability < 30 && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleAddToGroceryList(item.item)}
                                className="text-xs py-1 h-6"
                              >
                                Add to grocery list
                              </Button>
                            )}
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
          {recipeItems.some(item => item.useAlternative) && (
            <div className="mt-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold">Alternatives</h2>
              </div>
              <ul className="space-y-2">
                {recipeItems.filter(item => item.useAlternative).map((item) => (
                  <li key={item.id} className="flex items-center space-x-2">
                    <span className="w-[200px]">{item.item}</span>
                    <div className="relative w-[200px]">
                      <Input
                        value={item.alternative || ''}
                        onChange={(e) => handleAlternativeChange(item.id, e.target.value)}
                        placeholder="Enter alternative"
                        className="w-full pr-8"
                      />
                      {editedAlternatives[item.id] && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute right-8 top-1/2 transform -translate-y-1/2"
                          onClick={() => handleConfirmAlternative(item.id)}
                        >
                          <Check className="h-4 w-4 text-green-500" />
                        </Button>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleIgnoreAlternative(item.id)}
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">Ignore this item</span>
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="flex justify-end mt-8">
            <Button>
              Begin Cooking
            </Button>
          </div>
        </main>

        {/* Footer with input */}
        <footer className="bg-white p-4 border-t">
          <div className="flex items-center">
            <Input
              className="flex-1 mr-2"
              placeholder="What would you like to cook today?"
            />
            <Button size="sm">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </footer>
      </div>

      {/* Confirmation Dialog */}
      <AlertDialog open={confirmationOpen} onOpenChange={setConfirmationOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Change</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to change your {mealToChange.id !== null ? getMealType(mealToChange.id) : ''} to {mealToChange.newName}?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={cancelMealChange}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmMealChange}>Confirm</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Allergy Popup */}
      <AlertDialog open={allergyPopupOpen} onOpenChange={setAllergyPopupOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Allergy Alert</AlertDialogTitle>
            <AlertDialogDescription>
              {selectedAllergyItem && `${selectedAllergyItem.item} contains ${selectedAllergyItem.allergy}. What would you like to do?`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setAllergyPopupOpen(false)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => handleAllergyAction('ignore')}>Ignore this item</AlertDialogAction>
            <AlertDialogAction onClick={() => handleAllergyAction('alternative')}>Use Alternative</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}