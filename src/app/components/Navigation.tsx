import Link from 'next/link'

export default function Navigation() {
  return (
    <nav>
      <Link href="/">Home</Link>
      <Link href="/meal-plan">Meal Plan</Link>
      <Link href="/meal-plan-catalog">Meal Plan Catalog</Link>
      <Link href="/cook-wizard">Cook Wizard</Link>
      <Link href="/grocery-list">Grocery List</Link>
      <Link href="/grocery-order">Grocery Order</Link>
      <Link href="/community">Community</Link>
    </nav>
  )
}