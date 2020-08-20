
Pod::Spec.new do |s|
  s.name         = "RNAnalysysAgentModule"
  s.version      = "1.0.0"
  s.summary      = "This is the official iOS SDK for Analysys."
  s.description  = <<-DESC
                  易观方舟React Native插件
                   DESC
  s.homepage     = "https://www.analysysdata.com/"
  s.license      = { :type => "Apache License, Version 2.0" }
  s.author       = { "analysys" => "analysysSDK@analysys.com.cn" }
  s.platform     = :ios, "8.0"
  s.source       = { :git => "https://github.com/analysys/ans-ReactNative-sdk.git", :tag => "v#{s.version.to_s}" }
  s.source_files = "sdk/ios/*.{h,m}"
  s.requires_arc = true
  s.dependency   "React"
  s.dependency   "AnalysysAgent", ">= 4.4.6"

end

