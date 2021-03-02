import React from 'react';
import { useGeneralSettings } from '@wpengine/headless/react';
import { usePost } from '@wpengine/headless/next';
import type { GetServerSidePropsContext, GetStaticPropsContext } from 'next';
import {
  getApolloClient,
} from '@wpengine/headless';
import { gql } from '@apollo/client';
import { CTA, Footer, Header, Hero } from '../components';

export default function Single(): JSX.Element {
  const post = usePost();
  const settings = useGeneralSettings();

  return (
    <>
      <Header title={ settings?.title } description={ settings?.description } />
      <main className="content content-single">
        <h2 className='page-header'>{post?.title}</h2>
        <div className="wrap">
          { post && (
            <div>
              <div>
                {/* eslint-disable-next-line react/no-danger */ }
                <div dangerouslySetInnerHTML={ { __html: post.content ?? '' } } />
              </div>
            </div>
          ) }
        </div>
      </main>
      <Footer copyrightHolder={ settings?.title } />
    </>
  );
}

async function getProps(
  context: GetStaticPropsContext | GetServerSidePropsContext,
) {
  const apollo = getApolloClient(context);
  await apollo.query({
    query: gql`
    {
      menus {
        edges {
          node {
            menuItems {
              edges {
                node {
                  url
                  title
                  label
                }
              }
            }
          }
        }
      }
    }
  `});
}

export const getStaticProps = getProps;
export const getServerSideProps = getProps;
