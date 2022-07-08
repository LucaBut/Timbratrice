@component('mail::message')

Hello {{ $nome }}, <br><br>
-Nome: {{ $nome }} <br><br>
-Cognome: {{ $cognome }} <br><br>
-Email: {{ $email }} <br><br>
-Password: {{ $password }} <br><br>

@component('mail::button', ['url' => 'http://127.0.0.1:3000/'])
    Click Here To Login
@endcomponent

@endcomponent
