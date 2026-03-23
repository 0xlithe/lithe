import { notFound } from 'next/navigation'
import Link from 'next/link'
import { CustomPixelHeader } from '@/components/CustomPixelHeader'
import { PrivacyBackButton } from '@/components/PrivacyBackButton'
import { EXIT_OFFSET_PORTFOLIO } from '@/lib/site-config'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'quilt — Privacy Policy',
}

export default async function QuiltPrivacyPage({
  params,
}: {
  params: Promise<{ project: string }>
}) {
  const { project } = await params
  if (project !== 'quilt') notFound()

  return (
    <main className="relative max-h-[calc(100vh-10rem)] overflow-x-hidden overflow-y-auto px-4 lg:px-6">
      <div className="relative z-10 mr-auto max-w-2xl pr-4">
        <PrivacyBackButton />
        <CustomPixelHeader
          className="mt-2"
          exitOffset={EXIT_OFFSET_PORTFOLIO}
          exitDuration={0.7}
        >
          privacy
        </CustomPixelHeader>

        <article className="mt-6 space-y-6 break-words text-[15px] leading-[1.7] text-[var(--lithe-primary)] [&_code]:break-all">
          <p className="text-[var(--lithe-muted)] text-[13px]">
            Last updated: March 22, 2026
          </p>

          <p>
            quilt (&quot;the Extension&quot;) is a browser extension for
            automating engagement workflows on X (formerly Twitter). This policy
            explains what data quilt accesses, how it is used, and where it is
            stored.
          </p>

          <section>
            <h2 className="text-[18px] font-semibold text-[var(--lithe-primary)] mt-7 mb-2.5">
              Data We Collect
            </h2>
            <p>
              quilt does <strong>not</strong> collect, transmit, or store
              personal data on any external server controlled by quilt. All
              user data stays on your device.
            </p>
          </section>

          <section>
            <h2 className="text-[18px] font-semibold text-[var(--lithe-primary)] mt-7 mb-2.5">
              Data Stored Locally
            </h2>
            <p className="mb-3">
              The following data is stored in your browser&apos;s local extension
              storage (<code className="text-[var(--lithe-secondary)]">chrome.storage.local</code>) and
              never leaves your device:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Task settings</strong> — delay preferences, max action
                counts, and task type selections.
              </li>
              <li>
                <strong>Session counters</strong> — daily action counts used to
                enforce rate limits and cooldowns.
              </li>
              <li>
                <strong>Followed / liked ID sets</strong> — screen names or
                tweet IDs that quilt has interacted with, used to avoid duplicate
                actions.
              </li>
              <li>
                <strong>Saved searches and categories</strong> — search queries,
                names, and category colors you create.
              </li>
              <li>
                <strong>Debug preference</strong> — whether debug logging is
                enabled.
              </li>
              <li>
                <strong>License data</strong> — your activation code status,
                device identifier, and tier (Free or Pro). The device identifier
                is a randomly generated UUID with no link to your identity.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-[18px] font-semibold text-[var(--lithe-primary)] mt-7 mb-2.5">
              Network Requests
            </h2>
            <p className="mb-3">quilt makes network requests to the following domains:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>x.com / twitter.com</strong> — to perform follow,
                unfollow, like, and unlike actions on your behalf, using your
                existing authenticated session. quilt does not access, read, or
                store your X password or authentication tokens beyond what the
                browser natively provides to the page.
              </li>
              <li>
                <strong>api.lemonsqueezy.com</strong> — to activate, deactivate,
                and validate Pro license keys. Only the license key and a random
                device identifier are sent. No personal data, browsing history,
                or X account information is transmitted.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-[18px] font-semibold text-[var(--lithe-primary)] mt-7 mb-2.5">
              Data We Do Not Collect
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Browsing history or page content outside of X.</li>
              <li>Personal information such as name, email, or IP address.</li>
              <li>X account credentials or authentication tokens.</li>
              <li>Analytics, telemetry, or usage tracking of any kind.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-[18px] font-semibold text-[var(--lithe-primary)] mt-7 mb-2.5">
              Third-Party Services
            </h2>
            <p>
              quilt uses{' '}
              <Link
                href="https://www.lemonsqueezy.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--lithe-primary)] underline underline-offset-2 hover:opacity-80"
              >
                LemonSqueezy
              </Link>{' '}
              for license key management. When you activate or validate a Pro
              license, your license key and device identifier are sent to
              LemonSqueezy&apos;s API. LemonSqueezy&apos;s own privacy policy
              governs their handling of that data.
            </p>
          </section>

          <section>
            <h2 className="text-[18px] font-semibold text-[var(--lithe-primary)] mt-7 mb-2.5">
              Permissions
            </h2>
            <p className="mb-3">quilt requests the following browser permissions:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>storage</strong> — to save settings, session data, and
                license state locally.
              </li>
              <li>
                <strong>activeTab / tabs</strong> — to identify the current X
                tab and inject automation scripts only when you start a task.
              </li>
              <li>
                <strong>scripting</strong> — to inject content scripts into X
                tabs on demand (deferred loading).
              </li>
              <li>
                <strong>sidePanel</strong> — to provide the persistent side
                panel interface.
              </li>
              <li>
                <strong>Host access (x.com, twitter.com)</strong> — to interact
                with X pages for automation tasks.
              </li>
              <li>
                <strong>Host access (api.lemonsqueezy.com)</strong> — to
                validate Pro license keys.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-[18px] font-semibold text-[var(--lithe-primary)] mt-7 mb-2.5">
              Children&apos;s Privacy
            </h2>
            <p>
              quilt is not intended for use by anyone under the age of 13. We
              do not knowingly collect data from children.
            </p>
          </section>

          <section>
            <h2 className="text-[18px] font-semibold text-[var(--lithe-primary)] mt-7 mb-2.5">
              Changes to This Policy
            </h2>
            <p>
              We may update this privacy policy from time to time. Changes will
              be posted on this page with an updated date.
            </p>
          </section>

          <section>
            <h2 className="text-[18px] font-semibold text-[var(--lithe-primary)] mt-7 mb-2.5">
              Contact
            </h2>
            <p>
              If you have questions about this privacy policy, contact us at the
              email listed on the Chrome Web Store listing or via{' '}
              <Link
                href="https://lithe.pw"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--lithe-primary)] underline underline-offset-2 hover:opacity-80"
              >
                lithe.pw
              </Link>
              .
            </p>
          </section>

          <footer className="mt-10 pt-5 border-t border-[var(--lithe-border)] text-[var(--lithe-muted)] text-[13px]">
            quilt &bull; for X
          </footer>
        </article>
      </div>
    </main>
  )
}
