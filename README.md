# The Wild Oasis

Demo: https://wildoasis-app.vercel.app/dashboard
User: demo@example.com / 123456789

The Wild Oasis an internal hotel management application that allows hotel employees to manage cabins, bookings, and guests.

The app uses Supabase for its backend and implements a variety of React techniques, such as Compound Component Pattern, React Query.

**Technologies & Libraries:**

- React Query
- React Router
- React Icons
- React Hook Form - for form submition and validation
- React Hot Toast - for displaying onSuccess/onError toast messages
- React Error Boundary - to render fallback UI in case of runtime errors and prevent crashing the entire application
- Supabase - a back-end solution used as database, auth, and storage
- Recharts - to integrate charts into React application
- date-fns - date utility library for parsing, formatting, and manipulating dates
- Vite

## Key Features

1. **User Authentication & Authorization and Signup:**

   - Only authenticated users can have an access to views and perform CRUD operations in application
   - Hotel employees can log in to the application to perform tasks.
   - New users can only be signed up within the application to ensure that only actual hotel employees can create accounts.

2. **User Profile Management:**

   - Users can upload an avatar to personalize their profile.
   - Users can change their name and password.

3. **Cabin Management:**

   - The app provides a table view with all cabins.
   - The table view displays cabin information, including cabin photo, name, capacity, price, and current discount.
   - Users can update, duplicate or delete existing cabins.
   - Users can create new cabins, including the ability to upload a photo.

4. **Booking Management:**

   - The app provides a table view with all bookings.
   - The table view displays booking information, including arrival and departure dates, booking status, paid amount, cabin details, and guest data.
   - Booking status can be "unconfirmed", "checked in", or "checked out".
   - Additional booking data includes the number of guests, number of nights, guest observations, and whether breakfast was booked and its price.

5. **Booking Operations:**

   - Users can delete, check-in, or check out a booking as the guest arrives.
   - On check-in, users can accept payment outside the app and then confirm the payment within the app.
   - Guests can add breakfast for the entire stay during check-in if they hadn't already.

6. **Guest Data Management:**

   - Guest data contains full name, email, national ID, nationality, and a country flag for easy identification.

7. **Dashboard:**

   - The initial app screen serves as a dashboard displaying important information for the last 7, 30, or 90 days.
   - It shows a list of guests checking in and out on the current day, and users can perform tasks related to these activities from the dashboard.
   - The dashboard provides statistics on recent bookings, sales, check-ins, and occupancy rates.
   - It includes a chart showing all daily hotel sales, distinguishing between "total" sales and "extras" sales (only breakfast at present).
   - There's also a chart displaying statistics on stay durations, an important metric for the hotel.

8. **Application-wide Settings:**

   - Users can define application-wide settings such as breakfast price, minimum and maximum nights per booking, and maximum guests per booking.

9. **Dark Mode**

## Screenshots

**Login page:**

![image](https://github.com/vzo1990/the-wild-oasis/assets/45969772/cfa7a5b4-ddcf-4852-8614-724dcbb93d6e)

**Homepage / Dashboard:**

![image](https://github.com/vzo1990/the-wild-oasis/assets/45969772/acf493a4-fb31-4f55-937f-f7e3e2af2492)

**Bookings:**

![image](https://github.com/vzo1990/the-wild-oasis/assets/45969772/0da2c7ff-6c1a-4b76-9135-eeebe723a5af)

**Booking details:**

![image](https://github.com/vzo1990/the-wild-oasis/assets/45969772/fe4ee021-1a01-46d6-a202-c7c39bba5838)

**Cabins:**

![image](https://github.com/vzo1990/the-wild-oasis/assets/45969772/45905256-a7dd-43a3-ad20-84dc42580cc8)
