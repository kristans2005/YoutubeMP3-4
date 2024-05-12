<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;

use App\Models\History;
use App\Models\User;
use App\Models\youtube;
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

    $userId = Auth::id();

    $history = History::where('user_id', $userId)->orderBy('updated_at', 'desc')->get();

    return inertia::render('youtube/History', ['history' => $history]);
    }

    public function mp3ToHistory(Request $request){
        $userId = Auth::id();
        $url = $request->url;
        $title = $request->title;
    
        $existingRecord = History::where('url', $url)->where('user_id', $userId)->first();
    
        if ($existingRecord) {
        
            $existingRecord->amount += 1;
            $existingRecord->save();
        } else {

            $history = new History();
            $history->url = $url;
            $history->title = $title;
            $history->amount = 1;
            $history->user_id = $userId;
            
            $history->save();

        }
    
        return redirect()->intended('/' . $request->urlFormat);

    }

}
