# frozen_string_literal: true

require 'json'

package = JSON.parse(File.read(File.join(__dir__, 'package.json')))

Pod::Spec.new do |s|
  s.name         = 'react-native-bringg-driver-sdk'
  s.version      = package['version']
  s.summary      = package['description']
  s.homepage     = package['homepage']
  s.license      = package['license']
  s.authors      = package['author']

  s.platforms    = { ios: '11.0' }
  s.source       = { git: 'https://github.com/bringg/ReactNativeBringgDriverSDK.git', tag: s.version.to_s }

  s.source_files = 'ios/**/*.{h,m,mm}'

  s.dependency 'React'
  
  s.dependency 'BringgDriverSDKObjc', '1.122.0'
end
