"use client"

import { MainLayout, Sidebar, Footer } from "@/app/components/layouts";
import { Button } from "@/app/components/ui/button";
import { Checkbox } from "@/app/components/ui/checkbox";  // Assuming you have this

export default function GroceryListPage() {
  return (
    <MainLayout
      sidebar={
        <Sidebar>
          <h2 className="text-2xl font-bold mb-4">Shopping Lists</h2>
          <nav className="space-y-2">
            <a href="#" className="block p-2 hover:bg-gray-100 rounded">This Week</a>
            <a href="#" className="block p-2 hover:bg-gray-100 rounded">Saved Lists</a>
            <a href="#" className="block p-2 hover:bg-gray-100 rounded">History</a>
          </nav>
        </Sidebar>
      }
      footer={<Footer />}
    >
      <main className="flex-1 p-6">
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Current Shopping List</h1>
            <Button>Add Items</Button>
          </div>

          <div className="bg-white rounded-lg shadow">
            <div className="p-4 border-b">
              <h2 className="font-semibold">Produce</h2>
              <div className="space-y-2 mt-2">
                <div className="flex items-center">
                  <Checkbox id="tomatoes" />
                  <label htmlFor="tomatoes" className="ml-2">Tomatoes (4)</label>
                </div>
                <div className="flex items-center">
                  <Checkbox id="onions" />
                  <label htmlFor="onions" className="ml-2">Onions (2)</label>
                </div>
              </div>
            </div>

            <div className="p-4">
              <h2 className="font-semibold">Dairy</h2>
              <div className="space-y-2 mt-2">
                <div className="flex items-center">
                  <Checkbox id="milk" />
                  <label htmlFor="milk" className="ml-2">Milk (1L)</label>
                </div>
                <div className="flex items-center">
                  <Checkbox id="cheese" />
                  <label htmlFor="cheese" className="ml-2">Cheese (200g)</label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </MainLayout>
  );
}