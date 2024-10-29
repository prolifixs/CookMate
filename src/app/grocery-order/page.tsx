"use client"

import { MainLayout, Sidebar, Footer } from "@/app/components/layouts";
import { Button } from "@/app/components/ui/button";

export default function GroceryOrderPage() {
  return (
    <MainLayout
      sidebar={
        <Sidebar>
          <h2 className="text-2xl font-bold mb-4">Order Options</h2>
          <nav className="space-y-2">
            <a href="#" className="block p-2 hover:bg-gray-100 rounded">Current Order</a>
            <a href="#" className="block p-2 hover:bg-gray-100 rounded">Past Orders</a>
            <a href="#" className="block p-2 hover:bg-gray-100 rounded">Saved Stores</a>
          </nav>
        </Sidebar>
      }
      footer={<Footer />}
    >
      <main className="flex-1 p-6">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b">
              <h1 className="text-2xl font-bold mb-4">Order Summary</h1>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Items (8)</span>
                  <span>$45.97</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span>$5.99</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>$51.96</span>
                </div>
              </div>
            </div>

            <div className="p-6">
              <h2 className="font-semibold mb-4">Delivery Details</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-600">Address</label>
                  <input 
                    type="text" 
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    placeholder="Enter delivery address"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600">Delivery Time</label>
                  <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                    <option>As soon as possible</option>
                    <option>Schedule for later</option>
                  </select>
                </div>
                <Button className="w-full">Place Order</Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </MainLayout>
  );
}