<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {
        // Fetch users from the database
        $users = User::all();

        // Return the users data to the Inertia view
        return Inertia::render('Admin/Users', [
            'users' => $users
        ]);
    }
}
