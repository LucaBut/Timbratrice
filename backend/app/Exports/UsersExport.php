<?php

namespace App\Exports;

use App\Models\login;
use Maatwebsite\Excel\Concerns\FromCollection;

class UsersExport implements FromCollection{

    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {

        // return login::selectRaw("email, orari_inizio")->get()->toArray();
        return login::all();
        
    }
}
