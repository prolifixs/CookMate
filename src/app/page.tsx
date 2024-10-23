"use client"
import { useState, useMemo, useRef, useEffect } from 'react'
import Image from 'next/image';
import { Button } from "./components/ui/button"
import { Input } from "./components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "./components/ui/avatar"
import { Tabs, TabsList, TabsTrigger } from "./components/ui/tabs"
import { Badge } from "./components/ui/badge"
import { Card, CardContent } from "./components/ui/card"
import { ScrollArea } from "./components/ui/scroll-area"
import { Send, ChevronLeft, ChevronRight, Star, X } from 'lucide-react'
import { 
AlertDialog,
AlertDialogAction,
AlertDialogCancel,
AlertDialogContent,
AlertDialogDescription,
AlertDialogFooter,
AlertDialogHeader,
AlertDialogTitle,
} from "./components/ui/alert-dialog"
import {
DropdownMenu,
DropdownMenuContent,
DropdownMenuItem,
DropdownMenuLabel,
DropdownMenuSeparator,
DropdownMenuTrigger,
} from "./components/ui/dropdown-menu"



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
  // ... Continue for the rest of the week
};

const recentCooks = [
{
  id: 1,
  title: "Mac & Cheese",
  description: "Quick and easy comfort food",
  image: "/placeholder.svg?height=120&width=200"
},
{
  id: 2,
  title: "Turkey Stir Fry",
  description: "Healthy and flavorful dinner",
  image: "/placeholder.svg?height=120&width=200"
},
{
  id: 3,
  title: "Deli Meat / Sauerkraut",
  description: "Simple sandwich combo",
  image: "/placeholder.svg?height=120&width=200"
},
{
  id: 4,
  title: "Grilled Salmon",
  description: "Omega-3 rich seafood dish",
  image: "/placeholder.svg?height=120&width=200"
},
{
  id: 5,
  title: "Vegetable Curry",
  description: "Spicy and aromatic veggie meal",
  image: "/placeholder.svg?height=120&width=200"
},
{
  id: 6,
  title: "Chicken Parmesan",
  description: "Italian-American classic",
  image: "/placeholder.svg?height=120&width=200"
},
{
  id: 7,
  title: "Beef Tacos",
  description: "Fun and customizable dinner",
  image: "/placeholder.svg?height=120&width=200"
},
{
  id: 8,
  title: "Mushroom Risotto",
  description: "Creamy Italian rice dish",
  image: "/placeholder.svg?height=120&width=200"
},
{
  id: 9,
  title: "Sushi Rolls",
  description: "Homemade Japanese favorite",
  image: "/placeholder.svg?height=120&width=200"
},
{
  id: 10,
  title: "BBQ Ribs",
  description: "Tender and saucy meat dish",
  image: "/placeholder.svg?height=120&width=200"
}
]

const recommendations = [
{
  id: 1,
  title: "Quinoa Buddha Bowl",
  description: "Nutrient-packed vegetarian delight",
  image: "/placeholder.svg?height=120&width=200"
},
{
  id: 2,
  title: "Lemon Garlic Shrimp",
  description: "Zesty seafood in minutes",
  image: "/placeholder.svg?height=120&width=200"
},
{
  id: 3,
  title: "Spinach and Feta Stuffed Chicken",
  description: "Elegant yet easy dinner option",
  image: "/placeholder.svg?height=120&width=200"
},
{
  id: 4,
  title: "Vegan Lentil Shepherd's Pie",
  description: "Hearty plant-based comfort food",
  image: "/placeholder.svg?height=120&width=200"
},
{
  id: 5,
  title: "Teriyaki Glazed Salmon",
  description: "Sweet and savory Asian-inspired dish",
  image: "/placeholder.svg?height=120&width=200"
},
{
  id: 6,
  title: "Mediterranean Chickpea Salad",
  description: "Refreshing and protein-rich lunch",
  image: "/placeholder.svg?height=120&width=200"
},
{
  id: 7,
  title: "Butternut Squash Soup",
  description: "Creamy autumn favorite",
  image: "/placeholder.svg?height=120&width=200"
},
{
  id: 8,
  title: "Beef and Broccoli Stir-Fry",
  description: "Quick and satisfying weeknight meal",
  image: "/placeholder.svg?height=120&width=200"
},
{
  id: 9,
  title: "Caprese Stuffed Portobello Mushrooms",
  description: "Low-carb Italian-inspired appetizer",
  image: "/placeholder.svg?height=120&width=200"
},
{
  id: 10,
  title: "Honey Mustard Glazed Pork Chops",
  description: "Tangy and sweet main course",
  image: "/placeholder.svg?height=120&width=200"
}
]

export default function Home() {
  const [activeTab, setActiveTab] = useState('daily')
  const [weekMeals, setWeekMeals] = useState<WeekMeals>(fixedWeekMeals);
  const [editingMeal, setEditingMeal] = useState<{ day: string | null, id: number | null }>({ day: null, id: null })
  const [mealToChange, setMealToChange] = useState<{ day: string | null, id: number | null, newName: string, oldName: string }>({ day: null, id: null, newName: '', oldName: '' })
  const [confirmationOpen, setConfirmationOpen] = useState(false)
  const [recentCooksScrollPosition, setRecentCooksScrollPosition] = useState(0)
  const [recommendationsScrollPosition, setRecommendationsScrollPosition] = useState(0)
  const [showNotification, setShowNotification] = useState(true)
  const editInputRef = useRef<HTMLInputElement>(null)
  const currentDayRef = useRef<HTMLDivElement>(null)
  const recentCooksScrollContainerRef = useRef<HTMLDivElement>(null)
  const recommendationsScrollContainerRef = useRef<HTMLDivElement>(null)
  
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
  
  const handleMealEditStart = (day: string, id: number, currentName: string) => {
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
    setWeekMeals(prevWeekMeals => ({
      ...prevWeekMeals,
      [mealToChange.day as keyof typeof prevWeekMeals]: prevWeekMeals[mealToChange.day as keyof typeof prevWeekMeals].map(meal => 
        meal.id === mealToChange.id ? { ...meal, name: mealToChange.newName } : meal
      )
    }))
    setEditingMeal({ day: null, id: null })
    setConfirmationOpen(false)
  }
  
  const cancelMealChange = () => {
    setEditingMeal({ day: null, id: null })
    setConfirmationOpen(false)
  }
  
  const getMealType = (id: number): string => {
    if (id === 1) return 'breakfast'
    if (id === 2) return 'lunch'
    if (id === 3) return 'dinner'
    return 'unknown'
  }
  
  const handleScroll = (direction: 'left' | 'right', scrollContainerRef: React.RefObject<HTMLDivElement>, setScrollPosition: React.Dispatch<React.SetStateAction<number>>) => {
    const container = scrollContainerRef.current
    if (container) {
      const scrollAmount = direction === 'left' ? -210 : 210 // Adjusted for smaller card width
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' })
      setScrollPosition(container.scrollLeft + scrollAmount)
    }
  }
  type WeekMeals = {
    [key in typeof daysOfWeek[number]]: { id: number; name: string; color: string; }[];
  };
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
                  {weekMeals[day].map(meal => (
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
                          onClick={() => handleMealEditStart(day, meal.id, meal.name)}
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
            <h1 className="text-xl font-bold">MOTHERR</h1>
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
          <div className="flex justify-between items-start mb-8">
            <div>
              <h2 className="text-2xl font-bold mb-2">Manual Controls</h2>
              <p className="text-sm text-gray-500 mb-4">Ver 4.0 Mar 14</p>
              <div className="flex space-x-2">
                <Button variant="outline">Blending</Button>
                <Button variant="outline">Chopping</Button>
                <Button variant="outline">Chopping</Button>
              </div>
            </div>
            <Button variant="outline">Connect</Button>
          </div>
  
          {/* Recent Cooks and Notification Section */}
          <div className="flex justify-between mb-8"> {/* Update 1 */}
            {/* Recent Cooks Section */}
            <div className="flex-1 max-w-[660px] mr-4"> {/* Update 2 */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Recent Cooks</h2>
                <Button variant="link">View All</Button>
              </div>
              <div className="relative">
              <Button 
                  variant="outline" 
                  size="sm" // Change "icon" to "sm"
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10"
                  onClick={() => handleScroll('left', recentCooksScrollContainerRef, setRecentCooksScrollPosition)}
                >
                  <ChevronLeft className="h-4 w-4" />
              </Button>
                <div 
                  ref={recentCooksScrollContainerRef}
                  className="flex overflow-x-auto space-x-4 scrollbar-hide"
                  style={{ scrollSnapType: 'x mandatory' }}
                >
                  {recentCooks.map((cook) => (
                    <Card key={cook.id} className="flex-shrink-0 w-[200px]" style={{ scrollSnapAlign: 'start' }}>
                    <CardContent className="p-0 relative">
                      <Image
                        src={cook.image}
                        alt={cook.title}
                        width={200}
                        height={120}
                        className="object-cover"
                      />
                      <div className="absolute top-2 left-2 bg-white rounded-full p-1">
                        <Star className="h-3 w-3" />
                      </div>
                      {/* ... rest of the card content ... */}
                    </CardContent>
                    </Card>
                  ))}
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10"
                  onClick={() => handleScroll('right', recentCooksScrollContainerRef, setRecentCooksScrollPosition)}
                  disabled={recentCooksScrollPosition >= (recentCooks.length - 3) * 210}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
  
            {/* Notification Card */}
            {showNotification && (
              <Card className="w-64 bg-blue-50 ml-4 flex-shrink-0"> {/* Update 3 */}
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold">Cooking Tip</h3>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => setShowNotification(false)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-sm text-gray-600">
                    Always preheat your oven before baking for even cooking and better results.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
  
          {/* Recommendations Section */}
          <div className="w-full max-w-[660px] mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Recommendations</h2>
              <Button variant="link">View All</Button>
            </div>
            <div className="relative">
              <Button 
                variant="outline" 
                size="sm" 
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10"
                onClick={() => handleScroll('left', recommendationsScrollContainerRef, setRecommendationsScrollPosition)}
                disabled={recommendationsScrollPosition <= 0}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div 
                ref={recommendationsScrollContainerRef}
                className="flex overflow-x-auto space-x-4 scrollbar-hide"
                style={{ scrollSnapType: 'x mandatory' }}
              >
                {recommendations.map((recommendation) => (
                  <Card key={recommendation.id} className="flex-shrink-0 w-[200px]" style={{ scrollSnapAlign: 'start' }}>
                  <CardContent className="p-0 relative">
                      <Image
                        src={recommendation.image}
                        alt={recommendation.title}
                        width={200}
                        height={120}
                        className="object-cover"
                      />
                      <div className="absolute top-2 left-2 bg-white rounded-full p-1">
                        <Star className="h-3 w-3" />
                      </div>
                    {/* ... rest of the card content ...*/}
                  </CardContent>
                  </Card>
                ))}
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10"
                onClick={() => handleScroll('right', recommendationsScrollContainerRef, setRecommendationsScrollPosition)}
                disabled={recommendationsScrollPosition >= (recommendations.length - 3) * 210}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
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
    </div>
  )
  }