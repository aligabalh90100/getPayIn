import * as LocalAuthentication from "expo-local-authentication";

export default function useBiometrics() {
  async function isBiometricsSupported() {
    return await LocalAuthentication.hasHardwareAsync();
  }
  async function authenticateBiometrics() {
    const isBioSupported = isBiometricsSupported();
    if (!isBioSupported) return;
    return await LocalAuthentication.authenticateAsync();
  }

  return { authenticateBiometrics };
}
