<?php

namespace App\Http\Controllers\Physician;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class PatientsController extends Controller
{
    //
    public function index()
    {
        $role = Auth::user()->role;
        return inertia('Physician/Patients', [
            'role' => $role,
        ]);
    }
}
