package com.tunnelmoney;


import android.app.Application;

//import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.reactnativenavigation.NavigationApplication;
import java.util.Arrays;
import java.util.List;
import org.devio.rn.splashscreen.SplashScreenReactPackage;

public class MainApplication extends NavigationApplication {

    @Override
    public boolean isDebug() {
      return BuildConfig.DEBUG;
    }

    //@Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          //new MainReactPackage(),
          new SplashScreenReactPackage()
      );
    }
    @Override
    public String getJSMainModuleName() {
      return "index";
    }

		@Override
		public List<ReactPackage> createAdditionalReactPackages() {
				return getPackages();
		}
		/*
  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this,
// native exopackage
false);
  }
*/
}

