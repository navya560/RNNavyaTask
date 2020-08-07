package com.tunnelmoney;

//import com.facebook.react.ReactActivity;
import com.reactnativenavigation.controllers.SplashActivity;
import android.os.Bundle;
import android.content.Intent;
import android.net.Uri;
import android.content.Context;
import org.devio.rn.splashscreen.SplashScreen;
import android.os.Handler;
import android.app.Activity;
import android.media.MediaPlayer;
import android.media.MediaPlayer.OnCompletionListener;
import android.widget.VideoView;

public class MainActivity extends SplashActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    //@Override
    //protected String getMainComponentName() {
    //    return "tunnelmoney";
    //}
    @Override
    public void onCreate(Bundle savedInstanceState) {
        // SplashScreen.show(this);
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Intent intent = getIntent();
        if(intent!=null && intent.getData()!=null){
            //this.setIntent(intent);
            String action = intent.getAction();
            Uri data = intent.getData();
        }
    }
    /**
    * This function assumes logger is an instance of AppEventsLogger and has been
    * created using AppEventsLogger.newLogger() call.
    */
    public void logSentFriendRequestEvent () {
    }
    // protected void jump() {
    //     Intent  intent = new Intent(this, HomeActivity.class);
	//    startActivity(intent);
    // }
}