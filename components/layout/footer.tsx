export default function Footer() {
  return (
    <footer className="mt-auto w-full border-t bg-white p-4 dark:bg-gray-800">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Your Company. All rights reserved.
        </p>
        <div className="flex items-center space-x-4">
          <a
            href="/privacy-policy"
            className="text-sm text-muted-foreground hover:underline"
          >
            Privacy Policy
          </a>
          <a
            href="/terms-of-service"
            className="text-sm text-muted-foreground hover:underline"
          >
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
}
