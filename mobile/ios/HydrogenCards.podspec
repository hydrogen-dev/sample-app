Pod::Spec.new do |spec|
  spec.name         = "HydrogenCards"
  spec.version      = "0.1.0"
  spec.summary      = "A short description of HydrogenCardModules."
  spec.description  = "A very long description of CardModules."
  spec.homepage     = "https://www.hydrogenplatform.com/"
  spec.license      = "MIT"
  spec.author             = { "hydrogenplatform" => "https://www.hydrogenplatform.com/" }
  spec.platform     = :ios, "12.0"
  spec.source       = { :path => '.'}
  spec.vendored_frameworks = "HydrogenCards.xcframework"
end