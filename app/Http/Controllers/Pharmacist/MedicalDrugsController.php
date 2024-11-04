<?php

namespace App\Http\Controllers\Pharmacist;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class MedicalDrugsController extends Controller
{
    public function index()
    {
        $role = Auth::user()->role;
        return Inertia::render('Pharmacist/MedicalDrugs', [
            'role' => $role,
        ]);
    }
}
