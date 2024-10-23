<?php

namespace App\Http\Controllers\Physician;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;

class TreatmentController extends Controller
{
    public function index()
    {
        $role = Auth::user()->role;
        return inertia('Physician/Treatments', [
            'role' => $role,
        ]);
    }
}
