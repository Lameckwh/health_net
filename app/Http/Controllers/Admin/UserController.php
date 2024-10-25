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
