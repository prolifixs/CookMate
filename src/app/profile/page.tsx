"use client"

import { MainLayout, Sidebar, Footer } from "@/app/components/layouts";
import { Avatar } from "@/app/components/ui/avatar";  // Assuming you have this component
import { Button } from "@/app/components/ui/button";

export default function ProfilePage() {
  return (
    <MainLayout
      sidebar={
        <Sidebar>
          <h2 className="text-2xl font-bold mb-4">My Profile</h2>
          <nav className="space-y-2">
            <a href="#" className="block p-2 hover:bg-gray-100 rounded">Personal Info</a>
            <a href="#" className="block p-2 hover:bg-gray-100 rounded">Preferences</a>
            <a href="#" className="block p-2 hover:bg-gray-100 rounded">Settings</a>
          </nav>
        </Sidebar>
      }
      footer={<Footer />}
    >
      <main className="flex-1 p-6">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center space-x-4 mb-6">
              <Avatar className="w-20 h-20" />
              <div>
                <h1 className="text-2xl font-bold">John Doe</h1>
                <p className="text-gray-600">john.doe@example.com</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="border-b pb-4">
                <h2 className="font-semibold mb-2">Cooking Preferences</h2>
                <p className="text-gray-600">Vegetarian • Spicy • Quick Meals</p>
              </div>
              
              <div className="border-b pb-4">
                <h2 className="font-semibold mb-2">Favorite Cuisines</h2>
                <p className="text-gray-600">Italian, Thai, Mexican</p>
              </div>
              
              <Button>Edit Profile</Button>
            </div>
          </div>
        </div>
      </main>
    </MainLayout>
  );
}