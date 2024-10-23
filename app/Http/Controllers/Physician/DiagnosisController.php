<?php

namespace App\Http\Controllers\Physician;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class DiagnosisController extends Controller
{
    //
    public function index()
    {

        $role = Auth::user()->role;
        return inertia('Physician/Diagnosis', [
            'role' => $role,
        ]);
    }
}
