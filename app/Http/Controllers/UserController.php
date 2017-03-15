<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UserController extends Controller
{
    public function getProfile(Request $request)
	{
		return $request->user();
	}

	public function setProfile(Request $request)
	{
		$this->validate($request, [
			'name'		=> 'string|required',
			'email'     => 'email|required',
			'phone'     => 'numeric|nullable',
			'password'  => 'min:6|nullable',
		]);

		$user = $request->user();

		$userData = $request->all();

		$user->name = $userData['name'];
		$user->email = $userData['email'];

		if ($userData['phone']) {
			$user->phone = $userData['phone'];
		}
		if ($userData['password']) {
			$user->password = bcrypt($userData['password']);
		}

		if ($user->save()) {
			return json_encode(['message' => 'Profile updated']);
		}
	}
}
