@component('mail::message')

Hello {{ $nome }}, <br><br>
Here is your data: <br><br>
-Nome: {{ $nome }} <br><br>
-Cognome: {{ $cognome }} <br><br>
-Email: {{ $email }} <br><br>
-Password: {{ $password }} <br><br>

Please change your password here:

@component('mail::button', ['url' => 'http://127.0.0.1:3000/password'])
    Click Here to change your password
@endcomponent

@endcomponent
