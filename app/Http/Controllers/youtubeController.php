<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class youtubeController extends Controller
{

    public function mp3() {
        return inertia::render('youtube/YtMP3');

    }

    public function mp4() {
        return inertia::render('youtube/YtMP4');

    }

    public function history() {
        return inertia::render('youtube/History');

    }

}
