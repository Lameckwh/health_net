<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index()
    {
        // Fetch users from the database
        $users = User::all();
        $currentUserId = Auth::id(); // Get the current authenticated user's ID
        $role = Auth::user()->role;

        // Return the users data to the Inertia view
        return Inertia::render("Admin/Dashboard", [
            "users" => $users,
            "currentUserId" => $currentUserId,
            "role" => $role,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'role' => 'required|in:admin,physician,patient',
        ]);

        // Set a default password for new users
        $defaultPassword = 'Healthnet@2023';

        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($defaultPassword),
            'role' => $request->role,
            'status' => 'active', // Default to active when created
        ]);

        return redirect()->route('admin-dashboard')->with('success', 'User created successfully with the default password.');
    }



    public function updateRole(Request $request, $id)
    {
        $user = User::findOrFail($id);
        $user->role = $request->role;
        $user->save();

        return redirect()->route('admin-dashboard')->with('success', 'User role updated successfully.');
    }

    public function deactivate($id)
    {
        $user = User::findOrFail($id);
        $user->status = 'inactive';
        $user->save();

        return redirect()->route('admin-dashboard')->with('success', 'User deactivated successfully.');
    }

    public function activate($id)
{
    $user = User::findOrFail($id);
    $user->status = 'active';
    $user->save();

    return redirect()->route('admin-dashboard')->with('success', 'User activated successfully.');
}

}
