<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use App\http\Controllers\API\RegisterController;
use Illuminate\Support\Facades\Hash;

class SignUp extends Mailable
{
    use Queueable, SerializesModels;

    public $nome;
    public $cognome;
    public $email;
    public $password;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($data)
    {
        $this->nome = $data['nome'];
        $this->cognome = $data['cognome'];
        $this->email = $data['email'];
        $this->password = $data['password'];
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->markdown('SignUpView');
    }
}