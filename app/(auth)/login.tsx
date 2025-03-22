import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { Link, router } from 'expo-router';
import { Mail, Lock, ArrowRight } from 'lucide-react-native';
import { useAuthStore } from '@/store/auth';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const signIn = useAuthStore(state => state.signIn);

  const handleLogin = async () => {
    try {
      setError('');
      setLoading(true);
      await signIn(email, password);
      router.replace('/(tabs)');
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Bucket</Text>
            <Text style={styles.heroText}>Hero</Text>
          </View>
          <Text style={styles.subtitle}>Welcome back, adventurer!</Text>
        </View>

        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1519834785169-98be25ec3f84?w=800&auto=format&fit=crop&q=60' }}
          style={styles.heroImage}
        />

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Mail size={20} color="#64748b" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#94a3b8"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View style={styles.inputContainer}>
            <Lock size={20} color="#64748b" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#94a3b8"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <Pressable 
            style={[styles.loginButton, loading && styles.loadingButton]} 
            onPress={handleLogin}
            disabled={loading}
          >
            <Text style={styles.loginButtonText}>
              {loading ? 'Signing in...' : 'Sign in'}
            </Text>
            {!loading && <ArrowRight size={20} color="#fff" />}
          </Pressable>

          <Link href="/signup" asChild>
            <Pressable style={styles.signupButton}>
              <Text style={styles.signupButtonText}>
                Don't have an account? Sign up
              </Text>
            </Pressable>
          </Link>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 24,
  },
  header: {
    alignItems: 'center',
    marginTop: 48,
    marginBottom: 32,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
    marginBottom: 12,
  },
  title: {
    fontSize: 40,
    fontFamily: 'Inter-Bold',
    color: '#2563EB',
    letterSpacing: -1,
  },
  heroText: {
    fontSize: 40,
    fontFamily: 'Inter-Bold',
    color: '#7C3AED',
    letterSpacing: -1,
  },
  subtitle: {
    fontSize: 18,
    fontFamily: 'Inter-Regular',
    color: '#64748b',
  },
  heroImage: {
    width: '100%',
    height: 200,
    borderRadius: 24,
    marginBottom: 32,
  },
  form: {
    gap: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    paddingHorizontal: 16,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    height: 48,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#1e293b',
  },
  errorText: {
    color: '#ef4444',
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
  },
  loginButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#2563EB',
    padding: 16,
    borderRadius: 12,
    marginTop: 8,
  },
  loadingButton: {
    backgroundColor: '#93c5fd',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
  signupButton: {
    alignItems: 'center',
    padding: 16,
  },
  signupButtonText: {
    color: '#2563EB',
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
});