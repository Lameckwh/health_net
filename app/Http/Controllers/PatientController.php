<?php

namespace App\Http\Controllers;

use App\Models\Patient;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PatientController extends Controller
{
    // Display a list of patients
    public function index()
    {
        $patients = Patient::with('user')->get();
        return Inertia::render('Physician/Patients', [
            'patients' => $patients,
        ]);
    }

    // Show form to create a new patient
    public function create()
    {
        return Inertia::render('Physician/Patients/Create');
    }

    // Store a new patient
    public function store(Request $request)
    {
        $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'gender' => 'required|string',
            'date_of_birth' => 'required|date',
            'phone' => 'nullable|string',
            'address' => 'nullable|string',
            'nationality' => 'nullable|string',
            'district' => 'nullable|string',
            'national_id' => 'nullable|string',
            'medical_condition' => 'nullable|string',
        ]);

        $user = User::create([
            'name' => $request->first_name . ' ' . $request->last_name,
            'email' => strtolower($request->first_name . '.' . $request->last_name) . '@example.com',
            'password' => bcrypt('password'), // Change as per your requirement
            'role' => 'patient',
        ]);

        Patient::create([
            'user_id' => $user->id,
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'gender' => $request->gender,
            'date_of_birth' => $request->date_of_birth,
            'address' => $request->address,
            'phone' => $request->phone,
            'nationality' => $request->nationality,
            'district' => $request->district,
            'national_id' => $request->national_id,
            'medical_condition' => $request->medical_condition,
        ]);

        return redirect()->route('patients.index')->with('success', 'Patient created successfully.');
    }


    // Show form to edit an existing patient
    public function edit(Patient $patient)
    {
        return Inertia::render('Physician/Patients/Edit', [
            'patient' => $patient->load('user'),
        ]);
    }

    // Update an existing patient
    public function update(Request $request, Patient $patient)
    {
        $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'gender' => 'required|string',
            'date_of_birth' => 'required|date',
            'phone' => 'nullable|string',
            'address' => 'nullable|string',
            'nationality' => 'nullable|string',
            'district' => 'nullable|string',
            'national_id' => 'nullable|string',
            'medical_condition' => 'nullable|string',
        ]);

        $patient->update([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'gender' => $request->gender,
            'date_of_birth' => $request->date_of_birth,
            'address' => $request->address,
            'phone' => $request->phone,
            'nationality' => $request->nationality,
            'district' => $request->district,
            'national_id' => $request->national_id,
            'medical_condition' => $request->medical_condition,
        ]);

        $patient->user->update([
            'name' => $request->first_name . ' ' . $request->last_name,
        ]);

        return redirect()->route('patients.index')->with('success', 'Patient updated successfully.');
    }


    // Delete a patient
    public function destroy(Patient $patient)
    {
        $patient->delete();
        return redirect()->route('patients.index')->with('success', 'Patient deleted successfully.');
    }
}
