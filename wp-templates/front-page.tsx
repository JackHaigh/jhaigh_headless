import React from 'react';
import { usePosts, useGeneralSettings } from '@wpengine/headless/react';
import { GetStaticPropsContext } from 'next';
import { getApolloClient, getPosts } from '@wpengine/headless';
import { CTA, Header, Footer, Hero, Posts } from '../components';
import styles from '../scss/wp-templates/front-page.module.scss';

/**
 * Example of post variables to query the first six posts in a named category.
 * @see https://github.com/wpengine/headless-framework/tree/canary/docs/queries
 */
const firstSixInCategory = {
  variables: {
    first: 3,
  },
};

export default function FrontPage(props: any): JSX.Element {
  const posts = usePosts(firstSixInCategory);
  const settings = useGeneralSettings();

  return (
    <>
      <Header title={settings?.title} description={settings?.description} />
      <main className="content">
        <Hero
          title=""
          bgImage="/images/MG_9073.jpg"
          id={styles.home_hero}>
        </Hero>
        <section className={styles.explore}>
                  <h1 className="intro-h1">Hello, I'm Jack</h1>
                    <p className="intro-subline">Content Creator, Audio Researcher & Apparently Makes Headless Sites Now</p>
        </section>
        <Posts
          posts={posts?.nodes}
          heading="Check out some of my latest posts.."
          intro="Wether its web & multimedia, or software & research, here are some of my latest articles."
          headingLevel="h2"
          postTitleLevel="h3"
          id={styles.post_list}
        />
      </main>
      <Footer copyrightHolder={settings?.title} />
    </>
  );
}

/**
 * Get additional data from WordPress that is specific to this template.
 *
 * Here we retrieve the latest six WordPress posts in a named category to
 * display at the bottom of the front page.
 *
 * @see https://github.com/wpengine/headless-framework/tree/canary/docs/queries
 */
export async function getStaticProps(context: GetStaticPropsContext) {
  const client = getApolloClient(context);
  await getPosts(client, firstSixInCategory);
}
